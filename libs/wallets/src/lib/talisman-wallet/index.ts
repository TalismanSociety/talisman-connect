import { DotsamaWallet } from '../dotsama-wallet';

export class TalismanWallet extends DotsamaWallet {
  extensionName = 'talisman';
  title = 'Talisman Wallet';
  logo = {
    src: 'test-url',
    alt: 'Talisman Logo',
  };
}
