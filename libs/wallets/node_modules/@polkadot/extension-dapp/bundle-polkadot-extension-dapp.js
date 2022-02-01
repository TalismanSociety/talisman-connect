(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/util'), require('@polkadot/util-crypto')) :
  typeof define === 'function' && define.amd ? define(['exports', '@polkadot/util', '@polkadot/util-crypto'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotExtensionDapp = {}, global.polkadotUtil, global.polkadotUtilCrypto));
})(this, (function (exports, util, utilCrypto) { 'use strict';

  const global = window;

  function documentReadyPromise(creator) {
    return new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(creator());
      } else {
        window.addEventListener('load', () => resolve(creator()));
      }
    });
  }

  const packageInfo = {
    name: '@polkadot/extension-dapp',
    path: new URL('.', (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-extension-dapp.js', document.baseURI).href))).pathname,
    type: 'esm',
    version: '0.42.7'
  };

  const unwrapBytes = util.u8aUnwrapBytes;
  const wrapBytes = util.u8aWrapBytes;

  const win = window;
  win.injectedWeb3 = win.injectedWeb3 || {};
  function web3IsInjected() {
    return Object.keys(win.injectedWeb3).length !== 0;
  }
  function throwError(method) {
    throw new Error(`${method}: web3Enable(originName) needs to be called before ${method}`);
  }
  function mapAccounts(source, list, ss58Format) {
    return list.map(({
      address,
      genesisHash,
      name,
      type
    }) => {
      const encodedAddress = address.length === 42 ? address : utilCrypto.encodeAddress(utilCrypto.decodeAddress(address), ss58Format);
      return {
        address: encodedAddress,
        meta: {
          genesisHash,
          name,
          source
        },
        type
      };
    });
  }
  exports.isWeb3Injected = web3IsInjected();
  exports.web3EnablePromise = null;
  function getWindowExtensions(originName) {
    return Promise.all(Object.entries(win.injectedWeb3).map(([name, {
      enable,
      version
    }]) => Promise.all([Promise.resolve({
      name,
      version
    }), enable(originName).catch(error => {
      console.error(`Error initializing ${name}: ${error.message}`);
    })])));
  }
  function web3Enable(originName, compatInits = []) {
    if (!originName) {
      throw new Error('You must pass a name for your app to the web3Enable function');
    }
    const initCompat = compatInits.length ? Promise.all(compatInits.map(c => c().catch(() => false))) : Promise.resolve([true]);
    exports.web3EnablePromise = documentReadyPromise(() => initCompat.then(() => getWindowExtensions(originName).then(values => values.filter(value => !!value[1]).map(([info, ext]) => {
      if (!ext.accounts.subscribe) {
        ext.accounts.subscribe = cb => {
          ext.accounts.get().then(cb).catch(console.error);
          return () => {
          };
        };
      }
      return { ...info,
        ...ext
      };
    })).catch(() => []).then(values => {
      const names = values.map(({
        name,
        version
      }) => `${name}/${version}`);
      exports.isWeb3Injected = web3IsInjected();
      console.log(`web3Enable: Enabled ${values.length} extension${values.length !== 1 ? 's' : ''}: ${names.join(', ')}`);
      return values;
    })));
    return exports.web3EnablePromise;
  }
  async function web3Accounts({
    accountType,
    ss58Format
  } = {}) {
    if (!exports.web3EnablePromise) {
      return throwError('web3Accounts');
    }
    const accounts = [];
    const injected = await exports.web3EnablePromise;
    const retrieved = await Promise.all(injected.map(async ({
      accounts,
      name: source
    }) => {
      try {
        const list = await accounts.get();
        return mapAccounts(source, list.filter(({
          type
        }) => type && accountType ? accountType.includes(type) : true), ss58Format);
      } catch (error) {
        return [];
      }
    }));
    retrieved.forEach(result => {
      accounts.push(...result);
    });
    const addresses = accounts.map(({
      address
    }) => address);
    console.log(`web3Accounts: Found ${accounts.length} address${accounts.length !== 1 ? 'es' : ''}: ${addresses.join(', ')}`);
    return accounts;
  }
  async function web3AccountsSubscribe(cb, {
    ss58Format
  } = {}) {
    if (!exports.web3EnablePromise) {
      return throwError('web3AccountsSubscribe');
    }
    const accounts = {};
    const triggerUpdate = () => cb(Object.entries(accounts).reduce((result, [source, list]) => {
      result.push(...mapAccounts(source, list, ss58Format));
      return result;
    }, []));
    const unsubs = (await exports.web3EnablePromise).map(({
      accounts: {
        subscribe
      },
      name: source
    }) => subscribe(result => {
      accounts[source] = result;
      triggerUpdate();
    }));
    return () => {
      unsubs.forEach(unsub => {
        unsub();
      });
    };
  }
  async function web3FromSource(source) {
    if (!exports.web3EnablePromise) {
      return throwError('web3FromSource');
    }
    const sources = await exports.web3EnablePromise;
    const found = source && sources.find(({
      name
    }) => name === source);
    if (!found) {
      throw new Error(`web3FromSource: Unable to find an injected ${source}`);
    }
    return found;
  }
  async function web3FromAddress(address) {
    if (!exports.web3EnablePromise) {
      return throwError('web3FromAddress');
    }
    const accounts = await web3Accounts();
    let found;
    if (address) {
      const accountU8a = utilCrypto.decodeAddress(address);
      found = accounts.find(account => util.u8aEq(utilCrypto.decodeAddress(account.address), accountU8a));
    }
    if (!found) {
      throw new Error(`web3FromAddress: Unable to find injected ${address}`);
    }
    return web3FromSource(found.meta.source);
  }
  async function web3ListRpcProviders(source) {
    const {
      provider
    } = await web3FromSource(source);
    if (!provider) {
      console.warn(`Extension ${source} does not expose any provider`);
      return null;
    }
    return provider.listProviders();
  }
  async function web3UseRpcProvider(source, key) {
    const {
      provider
    } = await web3FromSource(source);
    if (!provider) {
      throw new Error(`Extension ${source} does not expose any provider`);
    }
    const meta = await provider.startProvider(key);
    return {
      meta,
      provider
    };
  }

  exports.packageInfo = packageInfo;
  exports.unwrapBytes = unwrapBytes;
  exports.web3Accounts = web3Accounts;
  exports.web3AccountsSubscribe = web3AccountsSubscribe;
  exports.web3Enable = web3Enable;
  exports.web3FromAddress = web3FromAddress;
  exports.web3FromSource = web3FromSource;
  exports.web3ListRpcProviders = web3ListRpcProviders;
  exports.web3UseRpcProvider = web3UseRpcProvider;
  exports.wrapBytes = wrapBytes;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
