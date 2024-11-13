import { Wallet } from '..'
import { AlephZeroWallet } from './aleph-zero-wallet'
import { EnkryptWallet } from './enkrypt-wallet'
import { FearlessWallet } from './fearless-wallet'
import { MantaWallet } from './manta-wallet'
import { NovaWallet } from './nova-wallet'
import { PolkadotjsWallet } from './polkadotjs-wallet'
import { PolkaGate } from './polkagate-wallet'
import { SubWallet } from './subwallet-wallet'
import { TalismanWallet } from './talisman-wallet'

// Export wallets as well for one and done usage
export {
  AlephZeroWallet,
  EnkryptWallet,
  FearlessWallet,
  MantaWallet,
  NovaWallet,
  PolkaGate,
  PolkadotjsWallet,
  SubWallet,
  TalismanWallet,
}

// Add new wallets here
const supportedWallets = [
  new TalismanWallet(),
  new NovaWallet(),
  new SubWallet(),
  new MantaWallet(),
  new PolkaGate(),
  new FearlessWallet(),
  new EnkryptWallet(),
  new PolkadotjsWallet(),
  new AlephZeroWallet(),
]

export function getWallets(): Wallet[] {
  return supportedWallets
}

export function getWalletBySource(
  source: string | unknown,
): Wallet | undefined {
  return supportedWallets.find((wallet) => {
    return wallet.extensionName === source
  })
}

export function isWalletInstalled(source: string | unknown): boolean {
  const wallet = getWalletBySource(source)
  return wallet?.installed as boolean
}
