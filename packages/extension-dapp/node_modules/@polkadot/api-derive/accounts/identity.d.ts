import type { Observable } from 'rxjs';
import type { Data } from '@polkadot/types';
import type { AccountId } from '@polkadot/types/interfaces';
import type { PalletIdentityRegistration } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { DeriveAccountRegistration, DeriveApi, DeriveHasIdentity } from '../types';
export declare function _identity(instanceId: string, api: DeriveApi): (accountId?: AccountId | Uint8Array | string) => Observable<[Option<PalletIdentityRegistration> | undefined, Option<ITuple<[AccountId, Data]>> | undefined]>;
/**
 * @name identity
 * @description Returns identity info for an account
 */
export declare function identity(instanceId: string, api: DeriveApi): (accountId?: AccountId | Uint8Array | string) => Observable<DeriveAccountRegistration>;
export declare const hasIdentity: (instanceId: string, api: DeriveApi) => (accountId: string | AccountId | Uint8Array) => Observable<DeriveHasIdentity>;
export declare function hasIdentityMulti(instanceId: string, api: DeriveApi): (accountIds: (AccountId | Uint8Array | string)[]) => Observable<DeriveHasIdentity[]>;
