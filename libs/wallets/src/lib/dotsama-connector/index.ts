import { signatureVerify } from '@polkadot/util-crypto';

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

  static async getSignature(
    address: string,
    payload: string
  ): Promise<string | null | Error> {
    try {
      const { web3FromAddress } = await import('@polkadot/extension-dapp');
      const extension = await web3FromAddress(address);
      if (!extension) {
        return null;
      }
      const { signature } = await extension.signer.signRaw?.({
        type: 'payload',
        data: payload,
        address,
      });
      if (!signatureVerify(payload, signature, address).isValid) {
        throw new Error(`Invalid signature:, ${address}, ${payload}`);
      }
      return signature;
    } catch (err) {
      console.log(`>>> err`, err);
      return err as Error;
    }
  }
}
