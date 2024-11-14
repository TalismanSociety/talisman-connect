import { isWalletInstalled } from '@talismn/connect-wallets'

export function removeIfUninstalled() {
  // Check saved `@talisman-connect/selected-wallet-name`
  // to see if the it is still installed or not.
  const selectedName = localStorage.getItem(
    '@talisman-connect/selected-wallet-name',
  )
  if (!isWalletInstalled(selectedName)) {
    localStorage.removeItem('@talisman-connect/selected-wallet-name')
  }
}
