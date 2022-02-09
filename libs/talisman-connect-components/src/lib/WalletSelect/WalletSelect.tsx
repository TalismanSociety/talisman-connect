import { WalletAccount, Wallet, getWallets } from '@talisman-connect/wallets';
import { cloneElement, ReactElement, useEffect, useState } from 'react';
import Modal from '../../lib/Modal/Modal';
import styles from './WalletSelect.module.css';
import { WalletList } from './WalletList';
import { AccountList } from './AccountList';
import { InstallExtension } from './InstallExtension';
import { NoAccounts } from './NoAccounts';
import { saveAndDispatchWalletSelect } from './saveAndDispatchWalletSelect';

export interface WalletSelectProps {
  onWalletConnectOpen?: (wallets: Wallet[]) => unknown;
  onWalletConnectClose?: () => unknown;
  onWalletSelected?: (wallet: Wallet) => unknown;
  onUpdatedAccounts?: (accounts: WalletAccount[] | undefined) => unknown;
  onAccountSelected?: (account: WalletAccount) => unknown;
  onError?: (error?: unknown) => unknown;
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
    onError,
    triggerComponent,
    showAccountsList,
  } = props;

  const [error, setError] = useState<Error>();
  const [supportedWallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const [accounts, setAccounts] = useState<WalletAccount[] | undefined>();
  const [loadingAccounts, setLoadingAccounts] = useState<boolean | undefined>();
  const [unsubscribe, setUnsubscribe] =
    useState<Record<string, () => unknown>>();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // TODO: Commenting out for now.
    // In the webapp, the `wallet.installed` is sometimes delayed for some reason.
    // Will need to figure out how to solve this one.
    // removeIfUninstalled();
    return () => {
      if (unsubscribe) {
        Object.values(unsubscribe).forEach((unsubscribeFn) => {
          unsubscribeFn?.();
        });
      }
    };
  });

  // TODO: Do proper error clearing...
  useEffect(() => {
    if (!selectedWallet) {
      setError(undefined);
    }
  }, [selectedWallet]);

  // Update error on consumers...
  useEffect(() => {
    if (onError) {
      onError(error || undefined);
    }
  }, [error, onError]);

  const onModalClose = () => {
    setIsOpen(false);
    setSelectedWallet(undefined);
    setError(undefined);
    if (onWalletConnectClose) {
      onWalletConnectClose();
    }
  };

  const onWalletListSelected = async (wallet: Wallet) => {
    setError(undefined);
    setLoadingAccounts(true);
    setSelectedWallet(wallet);

    const unsubscribeFn = unsubscribe?.[wallet.extensionName];

    if (!unsubscribeFn) {
      try {
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

        if (wallet.installed) {
          saveAndDispatchWalletSelect(wallet);
        }

        if (!showAccountsList && wallet.installed) {
          onModalClose();
        }
      } catch (err) {
        setError(err as Error);
        setLoadingAccounts(false);
        onError?.(err);
      }
    }

    if (onWalletSelected) {
      onWalletSelected(wallet);
    }
  };

  const installedTitle = error
    ? `${selectedWallet?.title} error`
    : `Select ${selectedWallet?.title} account`;

  const uninstalledTitle = loadingAccounts
    ? `Loading...`
    : `Haven't got a wallet yet?`;

  const accountsSelectionTitle = selectedWallet?.installed
    ? installedTitle
    : uninstalledTitle;

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
            triggerComponent.props.onClick?.(wallets);
            if (onWalletConnectOpen) {
              onWalletConnectOpen(wallets);
            }
          },
        })}
      <Modal
        className={styles['modal-overrides']}
        title={title}
        // TODO: Remove for now. Will need to figure out a better UX for this.
        // footer={
        //   !selectedWallet && (
        //     <NoWalletLink
        //       onClick={async () => {
        //         // TODO: Figure out this flow. Blindly pointing to Talisman does not work.
        //         // First one is top priority
        //         await onWalletListSelected(supportedWallets?.[0] as Wallet);
        //       }}
        //     />
        //   )
        // }
        handleClose={onModalClose}
        handleBack={
          selectedWallet ? () => setSelectedWallet(undefined) : undefined
        }
        isOpen={isOpen}
      >
        {!selectedWallet && (
          <WalletList items={supportedWallets} onClick={onWalletListSelected} />
        )}
        {selectedWallet && loadingAccounts && (
          <div
            style={{
              width: '100%',
              display: 'inline-flex',
              justifyContent: 'center',
            }}
          >
            <div className={styles['lds-dual-ring']} />
          </div>
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
        {error && <div className={styles['message']}>{error.message}</div>}
      </Modal>
    </>
  );
}

export default WalletSelect;
