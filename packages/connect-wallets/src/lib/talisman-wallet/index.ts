import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class TalismanWallet extends BaseDotsamaWallet {
  extensionName = 'talisman'
  title = 'Talisman'
  installUrl = 'https://talisman.xyz/download'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  logo = {
    src: logo,
    alt: 'Talisman Logo',
  }
}
