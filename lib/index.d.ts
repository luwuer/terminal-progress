interface ProgressOptions {
    name: string;
    current: number;
    total: number;
}
/**
 * Write and refresh progress in terminal
 * @param options
 */
export declare function progress(options: ProgressOptions): void;
export {};
