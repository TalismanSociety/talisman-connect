import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class MantaWallet extends BaseDotsamaWallet {
  extensionName = 'manta-wallet-js'
  title = 'Manta Wallet'
  installUrl =
    'https://chrome.google.com/webstore/detail/manta-wallet/enabgbdfcbaehmbigakijjabdpdnimlg'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  logo = {
    src: logo,
    alt: 'Manta Logo',
  }
}
