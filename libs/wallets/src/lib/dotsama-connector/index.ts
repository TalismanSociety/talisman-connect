// import { signatureVerify } from '@polkadot/util-crypto';
import {
  InjectedAccountWithMeta,
  Web3AccountsOptions,
} from '@polkadot/extension-inject/types';

const DAPP_NAME = 'Talisman'; // TODO: Get dapp name

// TODO: Delete this...
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

  static async subscribeAccounts(
    callback: (accounts: InjectedAccountWithMeta[]) => void | Promise<void>,
    options?: Web3AccountsOptions
  ) {
    const { web3AccountsSubscribe } = await import('@polkadot/extension-dapp');
    const unsubscribe = web3AccountsSubscribe(callback, options);
    return unsubscribe;
  }

  // static async getSigner(source: string): Promise<Signer | null> {
  //   const { web3FromSource } = await import('@polkadot/extension-dapp');
  //   const extension = await web3FromSource(source as string);
  //   if (!extension) {
  //     return null;
  //   }
  //   return extension.signer;
  // }

  // // [DO NOT USE]: Just a proof of concept. Dapp developers should just use the `signer` object as per doco
  // static async getSignature(
  //   source: string,
  //   address: string,
  //   payload: string
  // ): Promise<string | null | Error> {
  //   try {
  //     const signer = await this.getSigner(source);
  //     if (!signer?.signRaw) {
  //       return null;
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const { signature }: any = await signer.signRaw({
  //       type: 'payload',
  //       data: payload,
  //       address,
  //     });
  //     if (!signatureVerify(payload, signature, address).isValid) {
  //       throw new Error(`Invalid signature:, ${address}, ${payload}`);
  //     }
  //     return signature;
  //   } catch (err) {
  //     console.log(`>>> err`, err);
  //     return err as Error;
  //   }
  // }
}
