import { TalismanWallet } from './talisman-wallet';
import { PolkadotjsWallet } from './polkadotjs-wallet';
import { SubWallet } from './subwallet-wallet';
import { FearlessWallet } from './fearless-wallet';
import { Wallet } from '..';
import { EnkryptWallet } from './enkrypt-wallet';
import { AlephZeroWallet } from './aleph-zero-wallet';
import { MantaWallet } from './manta-wallet';
import { PolkaGate } from './polkagate-wallet';

// Export wallets as well for one and done usage
export { TalismanWallet, SubWallet, PolkadotjsWallet, EnkryptWallet, FearlessWallet, MantaWallet, PolkaGate, AlephZeroWallet };

// Add new wallets here
const supportedWallets = [
  new TalismanWallet(),
  new SubWallet(),
  new MantaWallet(),
  new FearlessWallet(),
  new PolkadotjsWallet(),
  new EnkryptWallet(),
  new PolkaGate(),
  new AlephZeroWallet()
];

export function getWallets(): Wallet[] {
  return supportedWallets;
}

export function getWalletBySource(
  source: string | unknown
): Wallet | undefined {
  return supportedWallets.find((wallet) => {
    return wallet.extensionName === source;
  });
}

export function isWalletInstalled(source: string | unknown): boolean {
  const wallet = getWalletBySource(source);
  return wallet?.installed as boolean;
}
