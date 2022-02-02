import { BaseDotsamaWallet } from '../base-dotsama-wallet';

export class PolkadotjsWallet extends BaseDotsamaWallet {
  extensionName = 'polkadot-js';
  title = 'Polkadot.js Wallet';
  logo = {
    src: 'test-url',
    alt: 'Polkadotjs Logo',
  };
}
