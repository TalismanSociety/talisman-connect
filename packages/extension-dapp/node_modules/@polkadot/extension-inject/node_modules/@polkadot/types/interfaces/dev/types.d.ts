import type { Struct, u64 } from '@polkadot/types-codec';
/** @name BlockStats */
export interface BlockStats extends Struct {
    readonly witnessLen: u64;
    readonly witnessCompactLen: u64;
    readonly blockLen: u64;
    readonly blockNumExtrinsics: u64;
}
export declare type PHANTOM_DEV = 'dev';
