import type { CodecClass, Registry } from '../types';
export declare function typesToMap(registry: Registry, [Types, keys]: [CodecClass[], string[]]): Record<string, string>;
