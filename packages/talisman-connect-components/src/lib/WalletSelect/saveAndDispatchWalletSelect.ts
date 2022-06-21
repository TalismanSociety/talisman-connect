import { Wallet } from '@talismn/wallets';

export function saveAndDispatchWalletSelect(wallet: Wallet) {
  localStorage.setItem('@talismn/selected-wallet-name', wallet.extensionName);

  const walletSelectedEvent = new CustomEvent('@talismn/wallet-selected', {
    detail: wallet,
  });

  document.dispatchEvent(walletSelectedEvent);
  console.info(`Event: @talismn/wallet-selected`, wallet);
}
