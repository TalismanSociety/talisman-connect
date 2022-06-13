/// <reference types="bn.js" />
import type { Observable } from 'rxjs';
import type { BN } from '@polkadot/util';
import type { DeriveApi } from '../types';
import type { Bag, BagExpanded } from './types';
export declare function expand(instanceId: string, api: DeriveApi): (bag: Bag) => Observable<BagExpanded>;
export declare function getExpanded(instanceId: string, api: DeriveApi): (id: BN | number) => Observable<BagExpanded>;
