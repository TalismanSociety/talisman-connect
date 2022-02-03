import { TalismanWallet } from './talisman-wallet';
import { PolkadotjsWallet } from './polkadotjs-wallet';
import { Wallet } from '..';

// Add new wallets here
const supportedWallets = [new TalismanWallet(), new PolkadotjsWallet()];

export function getWallets(): Wallet[] {
  return supportedWallets;
}

export function getWalletBySource(source: string): Wallet | undefined {
  return supportedWallets.find((wallet) => {
    return wallet.extensionName === source;
  });
}
