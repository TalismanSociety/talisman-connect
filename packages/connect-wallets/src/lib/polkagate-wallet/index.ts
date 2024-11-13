import { BaseDotsamaWallet } from '../base-dotsama-wallet'
import logo from './logo.svg'

export class PolkaGate extends BaseDotsamaWallet {
  extensionName = 'polkagate'
  title = 'PolkaGate'
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman'
  installUrl =
    'https://chrome.google.com/webstore/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp'
  logo = {
    src: logo,
    alt: 'PolkaGate Logo',
  }
}
