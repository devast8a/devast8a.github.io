export declare class Timer {
    private handle;
    private callback;
    timeout: number;
    constructor(timeout: number, callback: () => void);
    reset(): void;
    cancel(): void;
}
export declare class InputHandler {
    handler: ((message: string) => void) | undefined;
    entered: boolean;
    current: string;
    enabled: boolean;
    private timer;
    private promiseResolve;
    onKeyDown(event: KeyboardEvent): void;
    private resolve;
    getInput(timeout?: number): Promise<string | undefined>;
    disable(): void;
}
