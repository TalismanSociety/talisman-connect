import type { AnyTuple, Codec, Registry } from '@polkadot/types-codec/types';
import type { DispatchErrorModule, DispatchErrorModuleU8, DispatchErrorModuleU8a, ErrorMetadataLatest, EventMetadataLatest, PalletConstantMetadataLatest } from '../../interfaces';
import type { StorageEntry } from '../../primitive/types';
import type { CallFunction, IEvent, IEventLike } from '../../types';
export interface ConstantCodec extends Codec {
    readonly meta: PalletConstantMetadataLatest;
}
export interface IsError {
    readonly meta: ErrorMetadataLatest;
    is: (moduleError: DispatchErrorModule | DispatchErrorModuleU8 | DispatchErrorModuleU8a) => boolean;
}
export interface IsEvent<T extends AnyTuple, N = unknown> {
    readonly meta: EventMetadataLatest;
    is: (event: IEventLike) => event is IEvent<T, N>;
}
export declare type ModuleConstants = Record<string, ConstantCodec>;
export declare type ModuleErrors = Record<string, IsError>;
export declare type ModuleEvents = Record<string, IsEvent<AnyTuple>>;
export declare type ModuleExtrinsics = Record<string, CallFunction>;
export declare type ModuleStorage = Record<string, StorageEntry>;
export declare type Constants = Record<string, ModuleConstants>;
export declare type Errors = Record<string, ModuleErrors>;
export declare type Events = Record<string, ModuleEvents>;
export declare type Extrinsics = Record<string, ModuleExtrinsics>;
export declare type Storage = Record<string, ModuleStorage>;
export interface DecoratedMeta {
    readonly consts: Constants;
    readonly errors: Errors;
    readonly events: Events;
    readonly query: Storage;
    readonly registry: Registry;
    readonly tx: Extrinsics;
}
