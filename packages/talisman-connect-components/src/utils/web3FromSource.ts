import { getWalletBySource } from '@talismn/wallets';

export function web3FromSource() {
  const selectedItem = localStorage.getItem('@talismn/selected-wallet-name');
  const wallet = getWalletBySource(selectedItem as string);
  const extension = wallet?.extension;
  return extension;
}
