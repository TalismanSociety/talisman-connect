import type { JsonRpcRequest, JsonRpcResponse } from '../types';
/** @internal */
export declare class RpcCoder {
    #private;
    decodeResponse(response?: JsonRpcResponse): unknown;
    encodeJson(method: string, params: unknown[]): [number, string];
    encodeObject(method: string, params: unknown[]): [number, JsonRpcRequest];
}
