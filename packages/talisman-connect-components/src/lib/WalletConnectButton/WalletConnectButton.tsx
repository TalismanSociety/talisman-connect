import { getWallets, Wallet } from '@talismn/wallets';
import { cloneElement, ReactElement, ReactNode } from 'react';
import styles from './WalletConnectButton.module.css';

export interface WalletConnectButtonProps {
  onClick?: (wallets: Wallet[]) => unknown;
  children: ReactNode;
  className?: string;
  Component?: ReactElement;
}

export function WalletConnectButton(props: WalletConnectButtonProps) {
  const { onClick, children, Component, className = '' } = props;
  const ConnectComponent = Component || <button />;
  return (
    <>
      {cloneElement(ConnectComponent, {
        className: `${styles['wallet-connect-button']} ${className}`,
        children,
        onClick: () => {
          const wallets = getWallets();
          if (onClick) {
            onClick(wallets);
          }
        },
      })}
    </>
  );
}

export default WalletConnectButton;
