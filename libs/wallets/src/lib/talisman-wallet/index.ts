import { BaseDotsamaWallet } from '../base-dotsama-wallet';
import logo from './TalismanLogo.svg';

export class TalismanWallet extends BaseDotsamaWallet {
  extensionName = 'talisman';
  title = 'Talisman';
  logo = {
    src: logo,
    alt: 'Talisman Logo',
  };
}
