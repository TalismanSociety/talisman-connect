import { getWallets, Wallet } from '@talisman-connect/wallets';
import { ReactNode } from 'react';
import styles from './WalletConnectButton.module.css';

export interface WalletConnectButtonProps {
  onClick: (wallets: Wallet[]) => unknown;
  children: ReactNode;
  className?: string;
}

export function WalletConnectButton(props: WalletConnectButtonProps) {
  const { onClick, children, className = '' } = props;
  return (
    <button
      className={`${styles['no-styles']} ${className}`}
      onClick={() => {
        const wallets = getWallets();
        if (onClick) {
          onClick(wallets);
        }
      }}
    >
      {children}
    </button>
  );
}

export default WalletConnectButton;
