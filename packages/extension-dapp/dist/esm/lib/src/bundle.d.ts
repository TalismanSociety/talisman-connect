import type { InjectedAccountWithMeta, InjectedExtension, InjectedProviderWithMeta, ProviderList, Unsubcall, Web3AccountsOptions } from '@polkadot/extension-inject/types';
export { packageInfo } from './packageInfo';
export { unwrapBytes, wrapBytes } from './wrapBytes';
declare let isWeb3Injected: boolean;
declare let web3EnablePromise: Promise<InjectedExtension[]> | null;
export { isWeb3Injected, web3EnablePromise };
export declare function web3Enable(originName: string, extensionName: string, compatInits?: (() => Promise<boolean>)[]): Promise<InjectedExtension[]>;
export declare function web3Accounts({ accountType, ss58Format }?: Web3AccountsOptions): Promise<InjectedAccountWithMeta[]>;
export declare function web3AccountsSubscribe(cb: (accounts: InjectedAccountWithMeta[]) => void | Promise<void>, { ss58Format }?: Web3AccountsOptions): Promise<Unsubcall>;
export declare function web3FromSource(source: string): Promise<InjectedExtension>;
export declare function web3FromAddress(address: string): Promise<InjectedExtension>;
export declare function web3ListRpcProviders(source: string): Promise<ProviderList | null>;
export declare function web3UseRpcProvider(source: string, key: string): Promise<InjectedProviderWithMeta>;
//# sourceMappingURL=bundle.d.ts.map