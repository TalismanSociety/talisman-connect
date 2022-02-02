import { BaseDotsamaWallet } from '../base-dotsama-wallet';

export class TalismanWallet extends BaseDotsamaWallet {
  extensionName = 'talisman';
  title = 'Talisman Wallet';
  logo = {
    src: 'test-url',
    alt: 'Talisman Logo',
  };
}
