import { Wallet } from '@talismn/connect-wallets'

import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react'
import Download from '../../assets/icons/download.svg?react'
import { ListWithClickProps } from './types'
import styles from './WalletSelect.module.css'

export function WalletList({
  items,
  makeInstallable,
  onClick,
}: ListWithClickProps<Wallet>) {
  if (!items) return null

  return (
    <>
      {items.map((wallet, index) => (
        <WalletItem
          key={index}
          makeInstallable={makeInstallable}
          onClick={onClick}
          wallet={wallet}
        />
      ))}
    </>
  )
}

export const WalletItem = ({
  makeInstallable,
  onClick,
  wallet,
}: { wallet: Wallet } & Pick<
  ListWithClickProps<Wallet>,
  'makeInstallable' | 'onClick'
>) => {
  const available =
    wallet.installed || wallet.extensionName == 'talisman' || makeInstallable

  const canInstallWallet =
    makeInstallable ||
    (wallet.extensionName === 'talisman' && !wallet.installed)
  const selectWallet = () => onClick?.(wallet)
  const installWallet = () =>
    window.open(wallet.installUrl, '_blank', 'noopener,noreferrer')

  const handleClick = wallet.installed
    ? selectWallet
    : canInstallWallet
      ? installWallet
      : undefined

  return (
    <button
      className={
        available ? styles['row-button'] : styles['row-button-unavailable']
      }
      onClick={handleClick}
    >
      <span className={styles['flex']}>
        <img
          src={wallet.logo.src}
          alt={wallet.logo.alt}
          width={32}
          height={32}
        />
        {!wallet.installed ? 'Get ' : ''}
        {wallet.title}
      </span>

      {wallet.installed ? (
        <ChevronRightIcon />
      ) : canInstallWallet ? (
        <Download />
      ) : (
        'Not Installed'
      )}
    </button>
  )
}
