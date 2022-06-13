/// <reference types="bn.js" />
import type { Observable } from 'rxjs';
import type { BN } from '@polkadot/util';
import type { DeriveApi } from '../types';
import type { Bag } from './types';
export declare function _getIds(instanceId: string, api: DeriveApi): (ids: (BN | number)[]) => Observable<Bag[]>;
export declare function all(instanceId: string, api: DeriveApi): () => Observable<Bag[]>;
export declare function get(instanceId: string, api: DeriveApi): (id: BN | number) => Observable<Bag>;
