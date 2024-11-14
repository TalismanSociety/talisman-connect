import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react'
import { WithWalletProps } from './types'
import styles from './WalletSelect.module.css'

export function InstallExtension({ wallet: selectedWallet }: WithWalletProps) {
  return (
    <>
      <div className={styles['no-extension-message']}>
        {selectedWallet?.noExtensionMessage}
      </div>
      <a
        className={styles['row-button']}
        href={selectedWallet?.installUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <button className={styles['row-button']}>
          <span className={styles['flex']}>
            <img
              src={selectedWallet?.logo.src}
              alt={selectedWallet?.logo.alt}
              width={32}
              height={32}
            />
            Install {selectedWallet?.title}
          </span>
          <ChevronRightIcon />
        </button>
      </a>
    </>
  )
}
