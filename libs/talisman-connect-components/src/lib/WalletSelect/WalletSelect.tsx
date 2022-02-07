import { WalletAccount, Wallet, getWallets } from '@talisman-connect/wallets';
import { cloneElement, ReactElement, useEffect, useState } from 'react';
import Modal from '../../lib/Modal/Modal';
import styles from './WalletSelect.module.css';
import { NoWalletLink } from './NoWalletLink';
import { WalletList } from './WalletList';
import { ListSkeleton } from './ListSkeleton';
import { AccountList } from './AccountList';
import { InstallExtension } from './InstallExtension';
import { NoAccounts } from './NoAccounts';
import { saveAndDispatchWalletSelect } from './saveAndDispatchWalletSelect';
import { removeIfUninstalled } from './removeIfUninstalled';

export interface WalletSelectProps {
  onWalletConnectOpen?: (wallets: Wallet[]) => unknown;
  onWalletConnectClose?: () => unknown;
  onWalletSelected?: (wallet: Wallet) => unknown;
  onUpdatedAccounts?: (accounts: WalletAccount[] | undefined) => unknown;
  onAccountSelected?: (account: WalletAccount) => unknown;
  triggerComponent?: ReactElement;

  // If `showAccountsList` is specified, then account selection modal will show up.
  showAccountsList?: boolean;
}

export function WalletSelect(props: WalletSelectProps) {
  const {
    onWalletConnectOpen,
    onWalletConnectClose,
    onWalletSelected,
    onUpdatedAccounts,
    onAccountSelected,
    triggerComponent,
    showAccountsList,
  } = props;

  const [supportedWallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const [accounts, setAccounts] = useState<WalletAccount[] | undefined>();
  const [loadingAccounts, setLoadingAccounts] = useState<boolean | undefined>();
  const [unsubscribe, setUnsubscribe] =
    useState<Record<string, () => unknown>>();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    removeIfUninstalled();
    return () => {
      if (unsubscribe) {
        Object.values(unsubscribe).forEach((unsubscribeFn) => {
          unsubscribeFn?.();
        });
      }
    };
  });

  const onModalClose = () => {
    setIsOpen(false);
    if (onWalletConnectClose) {
      onWalletConnectClose();
    }
  };

  const onWalletListSelected = async (wallet: Wallet) => {
    setLoadingAccounts(true);
    setSelectedWallet(wallet);
    if (onWalletSelected) {
      onWalletSelected(wallet);
    }

    saveAndDispatchWalletSelect(wallet);

    const unsubscribeFn = unsubscribe?.[wallet.extensionName];

    if (!unsubscribeFn) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const unsub: any = await wallet.subscribeAccounts((accounts) => {
        setLoadingAccounts(false);
        setAccounts(accounts);
        if (onUpdatedAccounts) {
          onUpdatedAccounts(accounts);
        }
      });

      setUnsubscribe({
        [wallet.extensionName]: unsub,
      });
    }

    if (!showAccountsList && wallet.installed) {
      setSelectedWallet(undefined);
      setIsOpen(false);
    }
  };

  const accountsSelectionTitle = selectedWallet?.installed
    ? `Select ${selectedWallet?.title} account`
    : loadingAccounts
    ? `Loading...`
    : `Haven't got a wallet yet?`;

  const title = !selectedWallet ? 'Connect wallet' : accountsSelectionTitle;

  const selectedWalletAccounts = accounts?.filter(
    (account) => account.source === selectedWallet?.extensionName
  );

  const hasLoaded = loadingAccounts === false;
  const hasAccounts =
    hasLoaded &&
    selectedWallet?.installed &&
    selectedWalletAccounts &&
    selectedWalletAccounts?.length > 0;

  return (
    <>
      {triggerComponent &&
        cloneElement(triggerComponent, {
          onClick: (e: Event) => {
            e.stopPropagation();
            const wallets = getWallets();
            setWallets(wallets);
            setIsOpen(true);
            if (onWalletConnectOpen) {
              onWalletConnectOpen(wallets);
            }
            triggerComponent.props.onClick?.(wallets);
          },
        })}
      <Modal
        className={styles['modal-overrides']}
        title={title}
        footer={
          !selectedWallet && (
            <NoWalletLink
              onClick={async () => {
                // TODO: Figure out this flow. Blindly pointing to Talisman does not work.
                // First one is top priority
                await onWalletListSelected(supportedWallets?.[0] as Wallet);
              }}
            />
          )
        }
        handleClose={onModalClose}
        handleBack={
          selectedWallet ? () => setSelectedWallet(undefined) : undefined
        }
        isOpen={isOpen}
      >
        {!selectedWallet && (
          <WalletList items={supportedWallets} onClick={onWalletListSelected} />
        )}
        {selectedWallet && showAccountsList && loadingAccounts && (
          <ListSkeleton />
        )}
        {selectedWallet &&
          !selectedWallet?.installed &&
          loadingAccounts === false && (
            <InstallExtension wallet={selectedWallet} />
          )}
        {selectedWallet &&
          selectedWallet?.installed &&
          showAccountsList &&
          loadingAccounts === false && (
            <>
              {!hasAccounts && <NoAccounts wallet={selectedWallet} />}
              {hasAccounts && (
                <AccountList
                  items={selectedWalletAccounts}
                  onClick={(account) => {
                    if (onAccountSelected) {
                      onAccountSelected(account);
                    }
                    onModalClose();
                  }}
                />
              )}
            </>
          )}
      </Modal>
    </>
  );
}

export default WalletSelect;
