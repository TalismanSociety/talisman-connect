import { Wallet } from '@talismn/connect-wallets'

export function saveAndDispatchWalletSelect(wallet: Wallet) {
  localStorage.setItem(
    '@talisman-connect/selected-wallet-name',
    wallet.extensionName,
  )

  const walletSelectedEvent = new CustomEvent(
    '@talisman-connect/wallet-selected',
    {
      detail: wallet,
    },
  )

  document.dispatchEvent(walletSelectedEvent)
  console.info(`Event: @talisman-connect/wallet-selected`, wallet)
}
