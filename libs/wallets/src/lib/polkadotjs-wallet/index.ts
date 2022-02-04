import { BaseDotsamaWallet } from '../base-dotsama-wallet';
import logo from './PolkadotjsLogo.svg';

export class PolkadotjsWallet extends BaseDotsamaWallet {
  extensionName = 'polkadot-js';
  title = 'Polkadot.js';
  logo = {
    src: logo,
    alt: 'Polkadotjs Logo',
  };
}
