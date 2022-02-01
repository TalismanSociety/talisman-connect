import { SubscriptionFn, Wallet } from '../base-wallet';
import { DotsamaConnector } from '../dotsama-connector';

export class DotsamaWallet implements Wallet {
  extensionName = '';
  title = '';
  logo = {
    src: '',
    alt: '',
  };
  subscribe = async (callback: SubscriptionFn) => {
    const connect = DotsamaConnector.getConnector(this);
    const extension = await connect();
    const unsubscribe = extension?.accounts.subscribe(callback);
    return unsubscribe;
  };
}
