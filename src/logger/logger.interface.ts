
export interface ILogger {

    logger: unknown;

    log: (...args: unknown[]) => void;
    err: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;

};