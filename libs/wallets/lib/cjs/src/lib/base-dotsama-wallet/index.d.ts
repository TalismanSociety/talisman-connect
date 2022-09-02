import { InjectedExtension } from '@polkadot/extension-inject/types';
import type { Signer as InjectedSigner } from '@polkadot/api/types';
import { SubscriptionFn, Wallet, WalletAccount } from '../../types';
import { WalletError } from '../errors/BaseWalletError';
export declare class BaseDotsamaWallet implements Wallet {
    extensionName: string;
    title: string;
    installUrl: string;
    logo: {
        src: string;
        alt: string;
    };
    _extension: InjectedExtension | undefined;
    _signer: InjectedSigner | undefined;
    get extension(): InjectedExtension;
    get signer(): InjectedSigner;
    get installed(): boolean;
    get rawExtension(): import("@polkadot/extension-inject/types").InjectedWindowProvider;
    transformError: (err: Error) => WalletError | Error;
    enable: (dappName: string) => Promise<void>;
    getAccounts: (anyType?: boolean) => Promise<WalletAccount[]>;
    subscribeAccounts: (callback: SubscriptionFn) => Promise<import("@polkadot/extension-inject/types").Unsubcall>;
}
