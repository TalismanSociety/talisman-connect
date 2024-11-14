import { getWallets, Wallet } from '@talismn/connect-wallets'
import { cloneElement, ReactElement, ReactNode } from 'react'

import styles from './WalletConnectButton.module.css'

export interface WalletConnectButtonProps {
  onClick?: (wallets: Wallet[]) => unknown
  children: ReactNode
  Component?: ReactElement
  className?: string
}

export const WalletConnectButton = ({
  onClick,
  children,
  Component,
  className = '',
}: WalletConnectButtonProps) =>
  cloneElement(Component || <button />, {
    className: `${styles['wallet-connect-button']} ${className}`,
    children,
    onClick: () => onClick?.(getWallets()),
  })
