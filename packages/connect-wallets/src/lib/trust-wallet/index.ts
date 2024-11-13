import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class TrustWallet extends BaseDotsamaWallet {
  extensionName = 'trust'
  title = 'Trust Wallet'
  installUrl = 'https://trustwallet.com/download'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  logo = {
    src: logo,
    alt: 'Trust Wallet Logo',
  }
}
