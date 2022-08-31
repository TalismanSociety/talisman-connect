import { TalismanWallet } from './talisman-wallet';
import { PolkadotjsWallet } from './polkadotjs-wallet';
import { SubWallet } from './subwallet-wallet';
import { Wallet } from '..';
export { TalismanWallet, SubWallet, PolkadotjsWallet };
export declare function getWallets(): Wallet[];
export declare function getWalletBySource(source: string | unknown): Wallet | undefined;
export declare function isWalletInstalled(source: string | unknown): boolean;
