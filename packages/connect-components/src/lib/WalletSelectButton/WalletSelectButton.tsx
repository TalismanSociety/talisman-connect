import {
  NotInstalledError,
  Wallet,
  WalletAccount,
} from '@talismn/connect-wallets'
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react'

import styles from './WalletSelectButton.module.css'

export interface WalletSelectButtonProps {
  dappName: string
  wallet: Wallet
  onClick?: (accounts: WalletAccount[] | undefined) => unknown
  onError?: (error?: unknown) => unknown
  children: ReactNode
  className?: string
  Component?: ReactElement
}

type GenericFn = () => unknown

export function WalletSelectButton({
  wallet,
  onClick,
  onError,
  children,
  Component,
  className = '',
  dappName,
}: WalletSelectButtonProps) {
  const [unsubscribe, setUnsubscribe] = useState<GenericFn | undefined>()

  useEffect(() => {
    return () => void unsubscribe?.()
  }, [unsubscribe])

  const handleClick = async () => {
    if (!wallet.installed)
      return void onError?.(
        new NotInstalledError(`${wallet.extensionName} not installed`, wallet),
      )

    if (unsubscribe) return

    try {
      await wallet.enable(dappName)
      const unsub = await wallet.subscribeAccounts(
        (accounts: WalletAccount[] | undefined) => {
          onClick?.(accounts)
          if (!accounts) onError?.()
        },
      )
      setUnsubscribe(unsub as GenericFn)
    } catch (err) {
      console.log(`>>> err:WalletSelectButton`, err)
      onError?.(err)
    }
  }

  return cloneElement(Component || <button />, {
    className: `${styles['wallet-select-button']} wallet-select-button ${className}`,
    children,
    onClick: handleClick,
  })
}
