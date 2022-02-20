import { WalletAccount, Wallet, getWallets } from '@talisman-connect/wallets';
import {
  cloneElement,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './WalletSelect.module.css';
import { WalletList } from './WalletList';
import { AccountList } from './AccountList';
import { InstallExtension } from './InstallExtension';
import { NoAccounts } from './NoAccounts';
import { saveAndDispatchWalletSelect } from './saveAndDispatchWalletSelect';
import { Modal } from '@talisman-connect/ui';
import { Loading } from './Loading';
import { WalletSelectClasses } from './types';

export interface WalletSelectProps extends HTMLAttributes<HTMLDivElement> {
  dappName: string;
  open?: boolean;
  // If `showAccountsList` is specified, then account selection modal will show up.
  showAccountsList?: boolean;

  triggerComponent?: ReactElement;
  header?: ReactNode;
  footer?: ReactNode;

  classes?: WalletSelectClasses;

  onWalletConnectOpen?: (wallets: Wallet[]) => unknown;
  onWalletConnectClose?: () => unknown;
  onWalletSelected?: (wallet: Wallet) => unknown;
  onUpdatedAccounts?: (accounts: WalletAccount[] | undefined) => unknown;
  onAccountSelected?: (account: WalletAccount) => unknown;
  onError?: (error?: unknown) => unknown;
}

export function WalletSelect(props: WalletSelectProps) {
  const {
    className = '',
    style = {},
    classes,
    onWalletConnectOpen,
    onWalletConnectClose,
    onWalletSelected,
    onUpdatedAccounts,
    onAccountSelected,
    onError,
    triggerComponent,
    showAccountsList,
    header,
    footer,
    dappName,
    open = false,
  } = props;

  const [error, setError] = useState<Error>();
  const [supportedWallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const [accounts, setAccounts] = useState<WalletAccount[] | undefined>();
  const [loadingAccounts, setLoadingAccounts] = useState<boolean | undefined>();
  const [unsubscribe, setUnsubscribe] =
    useState<Record<string, () => unknown>>();

  const [isOpen, setIsOpen] = useState(false);

  const onModalOpen = useCallback(() => {
    const wallets = getWallets();
    setWallets(wallets);
    setIsOpen(true);
    setLoadingAccounts(false);
    if (onWalletConnectOpen) {
      onWalletConnectOpen(wallets);
    }
    return wallets;
  }, [onWalletConnectOpen]);

  const onModalClose = useCallback(() => {
    setIsOpen(false);
    setSelectedWallet(undefined);
    setError(undefined);
    setLoadingAccounts(false);
    if (onWalletConnectClose) {
      onWalletConnectClose();
    }
  }, [onWalletConnectClose]);

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

  useEffect(() => {
    if (open) {
      onModalOpen();
    }
  }, [onModalOpen, open]);

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

  const onWalletListSelected = useCallback(
    async (wallet: Wallet) => {
      setError(undefined);
      setSelectedWallet(wallet);

      try {
        setLoadingAccounts(true);
        await wallet.enable(dappName);

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

      if (onWalletSelected) {
        onWalletSelected(wallet);
      }
    },
    [
      dappName,
      onError,
      onModalClose,
      onUpdatedAccounts,
      onWalletSelected,
      showAccountsList,
    ]
  );

  const installedTitle = error
    ? `${selectedWallet?.title} error`
    : `Select ${selectedWallet?.title} account`;

  const uninstalledTitle = loadingAccounts
    ? `Loading...`
    : `Haven't got a wallet yet?`;

  const accountsSelectionTitle = selectedWallet?.installed
    ? installedTitle
    : uninstalledTitle;

  const defaultTitle = header || 'Connect wallet';
  const modalHeader = !selectedWallet ? defaultTitle : accountsSelectionTitle;

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
            const wallets = onModalOpen();
            triggerComponent.props.onClick?.(wallets);
          },
        })}
      <Modal
        className={`${styles['wallet-select-modal']} ${styles['dark-mode']} ${className}`}
        classes={classes}
        style={style}
        header={modalHeader}
        footer={footer}
        handleClose={onModalClose}
        handleBack={
          selectedWallet ? () => setSelectedWallet(undefined) : undefined
        }
        isOpen={isOpen}
      >
        {!selectedWallet && (
          <WalletList items={supportedWallets} onClick={onWalletListSelected} />
        )}
        {selectedWallet && loadingAccounts && <Loading />}
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
