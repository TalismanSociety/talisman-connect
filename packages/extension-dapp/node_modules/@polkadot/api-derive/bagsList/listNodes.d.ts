import type { Observable } from 'rxjs';
import type { PalletBagsListListBag, PalletBagsListListNode } from '@polkadot/types/lookup';
import type { DeriveApi } from '../types';
export declare function listNodes(instanceId: string, api: DeriveApi): (bag: PalletBagsListListBag | null) => Observable<PalletBagsListListNode[]>;
