export interface Assets {
    [name: string]: HTMLImageElement;
}
export declare class TmxEngine {
    private readonly sets;
    private readonly chunks;
    parseFromString(str: string, assets: Assets): void;
    setChunkData(x: number, y: number): number[][];
    queryTileXY(x: number, y: number): number[] | undefined;
    draw(left: number, top: number, staticTiles: CanvasRenderingContext2D, waterTiles: CanvasRenderingContext2D): void;
}
