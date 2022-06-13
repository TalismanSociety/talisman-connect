export class AlreadyDestroyedError extends Error {
    constructor() {
        super();
        this.name = "AlreadyDestroyedError";
    }
}
export class CrashError extends Error {
    constructor(message) {
        super(message);
        this.name = "CrashError";
    }
}
export class JsonRpcDisabledError extends Error {
    constructor() {
        super();
        this.name = "JsonRpcDisabledError";
    }
}
//# sourceMappingURL=types.js.map