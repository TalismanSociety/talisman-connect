import type { Call } from '@polkadot/types/interfaces';
import type { Registry } from '@polkadot/types-codec/types';
import type { ApiInterfaceRx, ApiTypes } from '../types';
import type { SubmittableExtrinsic } from './types';
import { ApiBase } from '../base';
declare type Creator<ApiType extends ApiTypes> = (extrinsic: Call | Uint8Array | string) => SubmittableExtrinsic<ApiType>;
export declare function createSubmittable<ApiType extends ApiTypes>(apiType: ApiTypes, api: ApiInterfaceRx, decorateMethod: ApiBase<ApiType>['_decorateMethod'], registry?: Registry, blockHash?: Uint8Array): Creator<ApiType>;
export {};
