import {
  NotInstalledError,
  Wallet,
  WalletAccount,
} from '@talisman-connect/wallets';
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import styles from './WalletSelectButton.module.css';

export interface WalletSelectButtonProps {
  wallet: Wallet;
  onClick?: (accounts: WalletAccount[] | undefined) => unknown;
  onError?: (error?: unknown) => unknown;
  children: ReactNode;
  className?: string;
  Component?: ReactElement;
}

type GenericFn = () => unknown;

export function WalletSelectButton(props: WalletSelectButtonProps) {
  const {
    wallet,
    onClick,
    onError,
    children,
    Component,
    className = '',
  } = props;
  const ConnectComponent = Component || <button />;

  const [unsubsribe, setUnsubscribe] = useState<GenericFn | undefined>();

  useEffect(() => {
    return () => {
      if (unsubsribe) {
        unsubsribe?.();
      }
    };
  }, [unsubsribe]);

  return (
    <>
      {cloneElement(ConnectComponent, {
        className: `${styles['wallet-select-button']} wallet-select-button ${className}`,
        children,
        onClick: async () => {
          if (!wallet.installed) {
            onError?.(
              new NotInstalledError(
                `${wallet.extensionName} not installed`,
                wallet
              )
            );
            return;
          }
          if (!unsubsribe) {
            try {
              const unsub = await wallet.subscribeAccounts(
                (accounts: WalletAccount[] | undefined) => {
                  onClick?.(accounts);
                  if (!accounts) {
                    onError?.();
                  }
                }
              );
              setUnsubscribe(unsub as GenericFn);
            } catch (err) {
              console.log(`>>> err:WalletSelectButton`, err);
              onError?.(err);
            }
          }
        },
      })}
    </>
  );
}

export default WalletSelectButton;
