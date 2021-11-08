import { TextDisplay } from './text_animations.js';
import { InputHandler } from './input_handler.js';
import { CharacterAnimation } from './data/animations.js';
import { TmxEngine } from './tmx.js';
import { Point } from './point.js';
import { FullscreenText } from './fullscreen_text.js';
import { _, Word } from './language_handler.js';
export declare enum Emote {
    FROWNS = 0,
    POINTS = 1,
    SMILES = 2,
    WAVES = 3
}
export declare function EmoteToText(emote: Emote, timeFadeout: number): TextDisplay;
interface Rectangle {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export declare class Character {
    name: Word;
    readonly simulation: Simulation;
    dictionary: Map<string, string>;
    text: TextDisplay[];
    x: number;
    y: number;
    animationData: CharacterAnimation;
    textColor: string;
    constructor(simulation: Simulation, dictionary: Map<string, string>, animationData: CharacterAnimation);
    private walk_promise;
    inRect(rect: Rectangle): boolean;
    walk(target: Point, offset?: Point): Promise<void>;
    emote(emote: Emote, delay?: number): Promise<unknown>;
    talk(listener: Character, words: (string | typeof _)[], delay?: number): Promise<void>;
    private targetTile;
    private path;
    currentAnimationFrame: number;
    currentAnimationTime: number;
    animation: any;
    animationFrame: number[];
    update(delta: number): void;
}
export declare class Simulation {
    readonly maya: Character;
    readonly player: Character;
    readonly people: Character[];
    readonly inputHandler: InputHandler;
    readonly map: TmxEngine;
    enableTranslation: boolean;
    enableMovement: boolean;
    enableDictionary: boolean;
    LRUwords: string[];
    fullscreenText: FullscreenText | undefined;
    showFullscreenText(text: string): Promise<void>;
    start(): Promise<void>;
}
export {};
