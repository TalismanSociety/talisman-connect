import { TalismanWallet } from './talisman-wallet';
import { PolkadotjsWallet } from './polkadotjs-wallet';

// Add new wallets here
const supportedWallets = [new TalismanWallet(), new PolkadotjsWallet()];

export function getWallets(): Array<Wallet> {
  return supportedWallets;
}
