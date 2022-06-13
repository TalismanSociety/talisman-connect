export interface SmoldotHealth {
    isSyncing: boolean;
    peers: number;
    shouldHavePeers: boolean;
}
export interface HealthChecker {
    setSendJsonRpc(sendRequest: (request: string) => void): void;
    start(healthCallback: (health: SmoldotHealth) => void): void;
    stop(): void;
    sendJsonRpc(request: string): void;
    responsePassThrough(response: string): string | null;
}
export declare function healthChecker(): HealthChecker;
export declare class HealthCheckError extends Error {
    #private;
    getCause(): unknown;
    constructor(response: unknown, message?: string);
}
