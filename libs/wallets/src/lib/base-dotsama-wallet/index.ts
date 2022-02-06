import {
  InjectedExtension,
  InjectedAccountWithMeta,
  InjectedWindow,
} from '@polkadot/extension-inject/types';
import type { Signer as InjectedSigner } from '@polkadot/api/types';
import { SubscriptionFn, Wallet } from '../../types';

const DAPP_NAME = 'Talisman'; // TODO: Get dapp name

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

    // NOTE: Using web3Enable will do a double popup if multiple extensions are installed.
    // However, calling `.enable` only returns the `Injected` type.
    // So manually building out the `extension` object here is necessary for consistency
    // with the return type of `web3Enable`.
    // const rawExtension = await injectedExtension.enable(DAPP_NAME);
    // const extension: InjectedExtension = {
    //   name: this.extensionName,
    //   version: injectedExtension.version,
    //   ...rawExtension,
    // };

    // TODO: Deprecate. Shows the usage with `web3Enable`.
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
