import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class EnkryptWallet extends BaseDotsamaWallet {
  extensionName = 'enkrypt'
  title = 'Enkrypt'
  installUrl = 'https://www.enkrypt.com/#overview'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  logo = {
    src: logo,
    alt: 'Enkrypt Logo',
  }
}
