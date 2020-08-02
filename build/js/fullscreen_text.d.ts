export declare class FullscreenText {
    readonly message: string;
    completed: (() => void) | undefined;
    fadeIn: number;
    fadeOut: number;
    duration: number;
    private time;
    constructor(message: string);
    update(delta: number): void;
    display(ctx: CanvasRenderingContext2D): void;
}
