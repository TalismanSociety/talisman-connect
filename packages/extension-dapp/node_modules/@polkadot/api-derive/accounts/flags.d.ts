import type { Observable } from 'rxjs';
import type { AccountId, Address, Balance } from '@polkadot/types/interfaces';
import type { PalletElectionsPhragmenSeatHolder } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';
import type { DeriveAccountFlags, DeriveApi } from '../types';
declare type FlagsIntermediate = [
    PalletElectionsPhragmenSeatHolder[] | [AccountId, Balance][] | undefined,
    AccountId[],
    AccountId[],
    AccountId[],
    Option<AccountId> | AccountId | undefined
];
export declare function _flags(instanceId: string, api: DeriveApi): () => Observable<FlagsIntermediate>;
/**
 * @name info
 * @description Returns account membership flags
 */
export declare function flags(instanceId: string, api: DeriveApi): (address?: AccountId | Address | string | null) => Observable<DeriveAccountFlags>;
export {};
