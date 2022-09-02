import { WalletError } from '.';
export declare type SubscriptionFn = (accounts: WalletAccount[] | undefined) => void | Promise<void>;
export interface WalletLogoProps {
    src: string;
    alt: string;
}
export interface WalletAccount {
    address: string;
    source: string;
    name?: string;
    wallet?: Wallet;
    signer?: unknown;
}
interface WalletData {
    extensionName: string;
    title: string;
    noExtensionMessage?: string;
    installUrl: string;
    logo: WalletLogoProps;
}
interface WalletExtension {
    installed: boolean | undefined;
    extension: any;
    signer: any;
}
interface Signer {
    sign?: (address: string, payload: string) => unknown;
}
interface Connector {
    enable: (dappName: string) => unknown;
    getAccounts: (anyType?: boolean) => Promise<WalletAccount[]>;
    subscribeAccounts: (callback: SubscriptionFn) => unknown;
}
interface WalletErrors {
    transformError: (err: WalletError) => Error;
}
export interface Wallet extends WalletData, WalletExtension, Connector, Signer, WalletErrors {
}
export {};
