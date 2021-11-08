import { TmxEngine } from './tmx.js';
import { Point } from './point.js';
interface PathFinderNode {
    id: string;
    x: number;
    y: number;
    f: number;
    g: number;
    from: PathFinderNode | undefined;
}
export declare class PathFinder {
    static find(tmx: TmxEngine, begin: Point, end: Point): PathFinderNode[];
}
export {};
