import { isWalletInstalled } from '@talismn/wallets';

export function removeIfUninstalled() {
  // Check saved `@talismn/selected-wallet-name`
  // to see if the it is still installed or not.
  const selectedName = localStorage.getItem('@talismn/selected-wallet-name');
  if (!isWalletInstalled(selectedName)) {
    localStorage.removeItem('@talismn/selected-wallet-name');
  }
}
