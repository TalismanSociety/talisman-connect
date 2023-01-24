import { BaseDotsamaWallet } from '../base-dotsama-wallet';
import logo from './TalismanLogo.svg';

export class TrustWallet extends BaseDotsamaWallet {
  extensionName = 'trust';
  title = 'Trust Wallet';
  installUrl = 'https://talisman.xyz/download';
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman';
  logo = {
    src: logo,
    alt: 'Talisman Logo',
  };
}
