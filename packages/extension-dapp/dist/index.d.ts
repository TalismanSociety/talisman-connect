import { InjectedExtension, Web3AccountsOptions, InjectedAccountWithMeta, Unsubcall, ProviderList, InjectedProviderWithMeta } from '@polkadot/extension-inject/types';
import { u8aUnwrapBytes, u8aWrapBytes } from '@polkadot/util';

declare const packageInfo: {
    name: string;
    path: string;
    type: string;
    version: string;
};

declare const unwrapBytes: typeof u8aUnwrapBytes;
declare const wrapBytes: typeof u8aWrapBytes;

declare let isWeb3Injected: boolean;
declare let web3EnablePromise: Promise<InjectedExtension[]> | null;

declare function web3Enable(originName: string, extensionName: string, compatInits?: (() => Promise<boolean>)[]): Promise<InjectedExtension[]>;
declare function web3Accounts({ accountType, ss58Format }?: Web3AccountsOptions): Promise<InjectedAccountWithMeta[]>;
declare function web3AccountsSubscribe(cb: (accounts: InjectedAccountWithMeta[]) => void | Promise<void>, { ss58Format }?: Web3AccountsOptions): Promise<Unsubcall>;
declare function web3FromSource(source: string): Promise<InjectedExtension>;
declare function web3FromAddress(address: string): Promise<InjectedExtension>;
declare function web3ListRpcProviders(source: string): Promise<ProviderList | null>;
declare function web3UseRpcProvider(source: string, key: string): Promise<InjectedProviderWithMeta>;

export { isWeb3Injected, packageInfo, unwrapBytes, web3Accounts, web3AccountsSubscribe, web3Enable, web3EnablePromise, web3FromAddress, web3FromSource, web3ListRpcProviders, web3UseRpcProvider, wrapBytes };
