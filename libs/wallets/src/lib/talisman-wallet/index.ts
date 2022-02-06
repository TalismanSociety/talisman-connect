import { BaseDotsamaWallet } from '../base-dotsama-wallet';
import logo from './TalismanLogo.svg';

export class TalismanWallet extends BaseDotsamaWallet {
  extensionName = 'talisman';
  title = 'Talisman';
  installUrl =
    'https://chrome.google.com/webstore/detail/talisman-wallet-alpha/fijngjgcjhjmmpcmkeiomlglpeiijkld';
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman';
  logo = {
    src: logo,
    alt: 'Talisman Logo',
  };
}
