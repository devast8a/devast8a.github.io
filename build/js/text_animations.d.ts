export declare type Animation = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, time: number) => void;
export declare const Animations: {
    upDown: (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, time: number) => void;
    leftRight: (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, time: number) => void;
    shaky: (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, time: number) => void;
    wavey: (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, time: number) => void;
    none: (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, time: number) => void;
};
export declare class TextDisplay {
    readonly text: string;
    readonly timeBetweenWords: number;
    animation: Animation;
    private words;
    private displayed;
    private word;
    timeToNextWord: number;
    timeFadeout: number;
    color: string;
    onTimeout: ((display: TextDisplay) => void) | undefined;
    constructor(text: string, options?: {
        timeBetweenWords?: number;
        timeFadeout?: number;
        animation?: Animation;
        color?: string;
    });
    display(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void;
    update(time: number): void;
}
