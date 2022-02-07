import {
  InjectedExtension,
  InjectedAccountWithMeta,
  InjectedWindow,
} from '@polkadot/extension-inject/types';
import type { Signer as InjectedSigner } from '@polkadot/api/types';
import { SubscriptionFn, Wallet } from '../../types';

const DAPP_NAME = 'Talisman Connect'; // TODO: Get dapp name

export class BaseDotsamaWallet implements Wallet {
  extensionName = '';
  title = '';
  installUrl = '';
  logo = {
    src: '',
    alt: '',
  };

  _extension: InjectedExtension | undefined;
  _signer: InjectedSigner | undefined;
  _installed: boolean | undefined;

  // API docs: https://polkadot.js.org/docs/extension/
  get extension() {
    return this._extension;
  }

  // API docs: https://polkadot.js.org/docs/extension/
  get signer() {
    return this._signer;
  }

  get installed() {
    return this._installed;
  }

  enable = async () => {
    const { web3Enable } = await import('@polkadot/extension-dapp');
    const injectedExtensions = await web3Enable(DAPP_NAME);
    const extension = injectedExtensions.find(
      (ext) => ext.name === this.extensionName
    );

    this._extension = extension;
    this._signer = extension?.signer;
    this._installed = !!extension;
  };

  subscribeAccounts = async (callback: SubscriptionFn) => {
    // const { web3Enable } = await import('@talismn/dapp-connect'); // TODO: Figure out exports error
    const { web3Enable, web3AccountsSubscribe, isWeb3Injected } = await import(
      '@polkadot/extension-dapp'
    );

    const injectedWindow = window as Window & InjectedWindow;
    const injectedExtension =
      injectedWindow?.injectedWeb3?.[this.extensionName];
    const isInstalled = isWeb3Injected && injectedExtension;

    this._installed = !!isInstalled;

    if (!isInstalled) {
      callback(undefined);
      return null;
    }

    const injectedExtensions = await web3Enable(DAPP_NAME);
    const extension = injectedExtensions.find(
      (ext) => ext.name === this.extensionName
    );

    this._extension = extension;
    this._signer = extension?.signer;

    const unsubscribe = web3AccountsSubscribe((accounts) => {
      const accountsWithWallet = accounts.map(
        (account: InjectedAccountWithMeta) => {
          return {
            ...account,
            name: account.meta.name,
            source: account.meta.source,
            wallet: this,
            signer: extension?.signer,
          };
        }
      );
      callback(accountsWithWallet);
    });

    return unsubscribe;
  };
}
