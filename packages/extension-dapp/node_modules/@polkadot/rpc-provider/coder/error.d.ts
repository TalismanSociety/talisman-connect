import { RpcErrorInterface } from '../types';
/**
 * @name RpcError
 * @summary Extension to the basic JS Error.
 * @description
 * The built-in JavaScript Error class is extended by adding a code to allow for Error categorization. In addition to the normal `stack`, `message`, the numeric `code` and `data` (any types) parameters are available on the object.
 * @example
 * <BR>
 *
 * ```javascript
 * const { RpcError } from '@polkadot/util');
 *
 * throw new RpcError('some message', RpcError.CODES.METHOD_NOT_FOUND); // => error.code = -32601
 * ```
 */
export default class RpcError<Data = never> extends Error implements RpcErrorInterface<Data> {
    code: number;
    data?: Data;
    message: string;
    name: string;
    stack: string;
    constructor(message?: string, code?: number, data?: Data);
    static CODES: {
        ASSERT: number;
        INVALID_JSONRPC: number;
        METHOD_NOT_FOUND: number;
        UNKNOWN: number;
    };
}
