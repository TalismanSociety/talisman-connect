import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class FearlessWallet extends BaseDotsamaWallet {
  extensionName = 'fearless-wallet'
  title = 'Fearless Wallet'
  installUrl =
    'https://chrome.google.com/webstore/detail/fearless-wallet/nhlnehondigmgckngjomcpcefcdplmgc'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  logo = {
    src: logo,
    alt: 'Fearless Wallet Logo',
  }
}
