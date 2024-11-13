import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class NovaWallet extends BaseDotsamaWallet {
  extensionName = 'polkadot-js'
  title = 'Nova Wallet'
  noExtensionMessage =
    'You can use any Polkadot js compatible option but we recommend using Nova Wallet'
  installUrl = 'https://novawallet.io'
  logo = {
    src: logo,
    alt: 'Nova Wallet Logo',
  }
}
