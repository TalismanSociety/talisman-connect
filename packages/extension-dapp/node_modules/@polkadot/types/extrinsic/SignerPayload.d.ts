import type { Registry } from '@polkadot/types-codec/types';
import type { HexString } from '@polkadot/util/types';
import type { Address, Call, ExtrinsicEra, Hash } from '../interfaces';
import type { Codec, ICompact, INumber, IRuntimeVersion, ISignerPayload, SignerPayloadJSON, SignerPayloadRaw } from '../types';
import { Struct, Text, Vec } from '@polkadot/types-codec';
export interface SignerPayloadType extends Codec {
    address: Address;
    blockHash: Hash;
    blockNumber: INumber;
    era: ExtrinsicEra;
    genesisHash: Hash;
    method: Call;
    nonce: ICompact<INumber>;
    runtimeVersion: IRuntimeVersion;
    signedExtensions: Vec<Text>;
    tip: ICompact<INumber>;
    version: INumber;
}
/**
 * @name GenericSignerPayload
 * @description
 * A generic signer payload that can be used for serialization between API and signer
 */
export declare class GenericSignerPayload extends Struct implements ISignerPayload, SignerPayloadType {
    #private;
    constructor(registry: Registry, value?: HexString | {
        [x: string]: unknown;
    } | Map<unknown, unknown> | unknown[]);
    get address(): Address;
    get blockHash(): Hash;
    get blockNumber(): INumber;
    get era(): ExtrinsicEra;
    get genesisHash(): Hash;
    get method(): Call;
    get nonce(): ICompact<INumber>;
    get runtimeVersion(): IRuntimeVersion;
    get signedExtensions(): Vec<Text>;
    get tip(): ICompact<INumber>;
    get version(): INumber;
    /**
     * @description Creates an representation of the structure as an ISignerPayload JSON
     */
    toPayload(): SignerPayloadJSON;
    /**
     * @description Creates a representation of the payload in raw Exrinsic form
     */
    toRaw(): SignerPayloadRaw;
}
