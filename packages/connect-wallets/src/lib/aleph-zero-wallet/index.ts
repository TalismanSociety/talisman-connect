import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class AlephZeroWallet extends BaseDotsamaWallet {
  extensionName = 'aleph-zero'
  title = 'Aleph Zero Signer'
  installUrl = 'https://alephzero.org/signer'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  logo = {
    src: logo,
    alt: 'Aleph Zero Logo',
  }
}
