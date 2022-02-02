import { DotsamaConnector } from '../dotsama-connector';

export class DotsamaWallet implements Wallet {
  extensionName = '';
  title = '';
  logo = {
    src: '',
    alt: '',
  };
  #_extension: unknown;

  get extension() {
    return this.#_extension;
  }

  // TODO: Rename to subscribeAccounts
  subscribe = async (callback: SubscriptionFn) => {
    const connect = DotsamaConnector.getConnector(this);
    const extension = await connect();
    // save `extension` to private variable
    this.#_extension = extension;
    const unsubscribe = extension?.accounts.subscribe(callback);
    return unsubscribe;
  };
}
