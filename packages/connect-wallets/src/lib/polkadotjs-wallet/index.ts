import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class PolkadotjsWallet extends BaseDotsamaWallet {
  extensionName = 'polkadot-js'
  title = 'Polkadot.js'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  installUrl = 'https://polkadot.js.org/extension/'
  logo = {
    src: logo,
    alt: 'Polkadotjs Logo',
  }
}
