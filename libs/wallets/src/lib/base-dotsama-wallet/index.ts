import { DotsamaConnector } from '../dotsama-connector';

export class BaseDotsamaWallet implements Wallet {
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

  subscribeAccounts = async (callback: SubscriptionFn) => {
    const connect = DotsamaConnector.getConnector(this);
    const extension = await connect();
    this.#_extension = extension;
    const unsubscribe = extension?.accounts.subscribe((accounts) => {
      const accountsWithWallet = accounts.map((account) => ({
        ...account,
        wallet: this,
      }));
      callback(accountsWithWallet);
    });
    return unsubscribe;
  };

  sign = async (address: string, payload: string) => {
    const signature = await DotsamaConnector.getSignature(address, payload);
    return signature;
  };
}
