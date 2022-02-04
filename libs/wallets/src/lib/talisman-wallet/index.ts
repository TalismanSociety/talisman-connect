import { Wallet } from '../../types';
import { BaseDotsamaWallet } from '../base-dotsama-wallet';
import logo from './TalismanLogo.svg';

export class TalismanWallet extends BaseDotsamaWallet implements Wallet {
  extensionName = 'talisman';
  title = 'Talisman';
  installUrl =
    'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd/related';
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman';
  logo = {
    src: logo,
    alt: 'Talisman Logo',
  };
}
