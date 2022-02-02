import { TalismanWallet } from './talisman-wallet';
import { PolkadotjsWallet } from './polkadotjs-wallet';

export function getWallets(): Array<Wallet> {
  return [new TalismanWallet(), new PolkadotjsWallet()];
}
