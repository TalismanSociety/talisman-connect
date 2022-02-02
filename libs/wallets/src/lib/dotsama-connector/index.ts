const DAPP_NAME = 'Talisman1'; // TODO: Get dapp name

export class DotsamaConnector {
  static getConnector(wallet: WalletData) {
    return async () => {
      const { web3Enable } = await import('@polkadot/extension-dapp');
      // const { web3Enable } = await import('@talismn/dapp-connect'); // TODO: Figure out error
      const injectedExtensions = await web3Enable(DAPP_NAME);
      const extension = injectedExtensions.find(
        (ext) => ext.name === wallet.extensionName
      );
      return extension;
    };
  }
}
