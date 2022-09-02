import * as _polkadot_extension_inject_types from '@polkadot/extension-inject/types';
import { InjectedExtension } from '@polkadot/extension-inject/types';
import { Signer as Signer$1 } from '@polkadot/api/types';

declare type SubscriptionFn = (accounts: WalletAccount[] | undefined) => void | Promise<void>;
interface WalletLogoProps {
    src: string;
    alt: string;
}
interface WalletAccount {
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
interface Wallet extends WalletData, WalletExtension, Connector, Signer, WalletErrors {
}

interface WalletError extends Error {
    readonly wallet: Wallet;
}
declare class BaseWalletError extends Error implements WalletError {
    name: string;
    readonly wallet: Wallet;
    constructor(message: string, wallet: Wallet);
}

declare class BaseDotsamaWallet implements Wallet {
    extensionName: string;
    title: string;
    installUrl: string;
    logo: {
        src: string;
        alt: string;
    };
    _extension: InjectedExtension | undefined;
    _signer: Signer$1 | undefined;
    get extension(): InjectedExtension;
    get signer(): Signer$1;
    get installed(): boolean;
    get rawExtension(): _polkadot_extension_inject_types.InjectedWindowProvider;
    transformError: (err: Error) => WalletError | Error;
    enable: (dappName: string) => Promise<void>;
    getAccounts: (anyType?: boolean) => Promise<WalletAccount[]>;
    subscribeAccounts: (callback: SubscriptionFn) => Promise<_polkadot_extension_inject_types.Unsubcall>;
}

declare class TalismanWallet extends BaseDotsamaWallet {
    extensionName: string;
    title: string;
    installUrl: string;
    noExtensionMessage: string;
    logo: {
        src: string;
        alt: string;
    };
}

declare class PolkadotjsWallet extends BaseDotsamaWallet {
    extensionName: string;
    title: string;
    noExtensionMessage: string;
    installUrl: string;
    logo: {
        src: string;
        alt: string;
    };
}

declare class SubWallet extends BaseDotsamaWallet {
    extensionName: string;
    title: string;
    installUrl: string;
    noExtensionMessage: string;
    logo: {
        src: string;
        alt: string;
    };
}

declare function getWallets(): Wallet[];
declare function getWalletBySource(source: string | unknown): Wallet | undefined;
declare function isWalletInstalled(source: string | unknown): boolean;

declare class AuthError extends BaseWalletError {
    readonly name = "AuthError";
}

declare class NotInstalledError extends BaseWalletError {
    readonly name = "NotInstalledError";
}

declare class SetupNotDoneError extends BaseWalletError {
    readonly name = "SetupNotDoneError";
}

export { AuthError, BaseDotsamaWallet, BaseWalletError, NotInstalledError, PolkadotjsWallet, SetupNotDoneError, SubWallet, SubscriptionFn, TalismanWallet, Wallet, WalletAccount, WalletError, WalletLogoProps, getWalletBySource, getWallets, isWalletInstalled };
