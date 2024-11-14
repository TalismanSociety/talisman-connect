import { WithWalletProps } from './types'
import styles from './WalletSelect.module.css'

export function NoAccounts({ wallet: selectedWallet }: WithWalletProps) {
  return (
    <div className={styles['no-extension-message']}>
      <div>No accounts found.</div>
      <div>Add an account in {selectedWallet?.title} to get started.</div>
    </div>
  )
}
