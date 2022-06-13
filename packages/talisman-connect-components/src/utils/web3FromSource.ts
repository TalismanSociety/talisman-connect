import { getWalletBySource } from '@talisman-connect/wallets';

export function web3FromSource() {
  const selectedItem = localStorage.getItem(
    '@talisman-connect/selected-wallet-name'
  );
  const wallet = getWalletBySource(selectedItem as string);
  const extension = wallet?.extension;
  return extension;
}
