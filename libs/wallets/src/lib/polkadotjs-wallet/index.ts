import { DotsamaWallet } from '../dotsama-wallet';

export class PolkadotjsWallet extends DotsamaWallet {
  extensionName = 'polkadot-js';
  title = 'Polkadot.js Wallet';
  logo = {
    src: 'test-url',
    alt: 'Polkadotjs Logo',
  };
}
