import { Wallet } from '../../types';
export interface WalletError extends Error {
    readonly wallet: Wallet;
}
export declare class BaseWalletError extends Error implements WalletError {
    name: string;
    readonly wallet: Wallet;
    constructor(message: string, wallet: Wallet);
}
