import { tile_walkable } from './data/tile_walkable.js';
export class PathFinder {
    static find(tmx, begin, end) {
        const open = [{
                id: begin.x + '-' + begin.y,
                x: begin.x,
                y: begin.y,
                f: Math.abs(begin.x - end.x) + Math.abs(begin.y - end.y),
                g: 0,
                from: undefined,
            }];
        const nodes = new Map();
        const neighbors = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ];
        while (open.length > 0) {
            open.sort((a, b) => b.f - a.f);
            const current = open.pop();
            if (current.x === end.x && current.y === end.y) {
                const path = [];
                let next = current;
                while (next !== undefined) {
                    path.push(next);
                    next = next.from;
                }
                return path;
            }
            for (const neighbor of neighbors) {
                const x = current.x + neighbor.x;
                const y = current.y + neighbor.y;
                const id = x + '-' + y;
                const g = current.g + 1;
                const node = nodes.get(id);
                if (node === undefined) {
                    // Check to make sure it's a valid node
                    const tiles = tmx.queryTileXY(x, y);
                    if (tiles === undefined || tiles.some(tile => !tile_walkable[tile])) {
                        continue;
                    }
                    const node = {
                        id: id,
                        x: x,
                        y: y,
                        f: g + Math.abs(x - end.x) + Math.abs(y - end.y),
                        g: g,
                        from: current,
                    };
                    nodes.set(id, node);
                    open.push(node);
                }
                else if (g < node.g) {
                    node.from = current;
                    node.g = g;
                    node.f = g + Math.abs(x - end.x) + Math.abs(y - end.y);
                }
            }
        }
        return [];
    }
}
//# sourceMappingURL=path_finder.js.map