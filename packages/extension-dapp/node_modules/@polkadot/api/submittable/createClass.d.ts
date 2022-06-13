import type { Constructor } from '@polkadot/types/types';
import type { ApiInterfaceRx, ApiTypes } from '../types';
import type { SubmittableExtrinsic } from './types';
import { ApiBase } from '../base';
interface SubmittableOptions<ApiType extends ApiTypes> {
    api: ApiInterfaceRx;
    apiType: ApiTypes;
    blockHash?: Uint8Array;
    decorateMethod: ApiBase<ApiType>['_decorateMethod'];
}
export declare function createClass<ApiType extends ApiTypes>({ api, apiType, blockHash, decorateMethod }: SubmittableOptions<ApiType>): Constructor<SubmittableExtrinsic<ApiType>>;
export {};
