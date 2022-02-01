import { InjectedAccount } from '@polkadot/extension-inject/types';
import { SubscriptionFn, Wallet } from '../base-wallet';
import { DotsamaConnector } from '../dotsama-connector';

export class DotsamaWallet implements Wallet {
  extensionName = '';
  title = '';
  logo = {
    src: '',
    alt: '',
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe = async (callback: any) => {
    const connect = DotsamaConnector.getConnector(this);
    const extension = await connect();
    const unsubscribe = extension?.accounts.subscribe(callback);
    return unsubscribe;
  };
}
