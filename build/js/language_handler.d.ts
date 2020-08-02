import { Character, Simulation } from './test.js';
declare type LanguageRuleHandler = (simulation: Simulation, speaker: Character, listener: Character, words: Word[]) => Promise<void>;
export declare function textToWords(text: string): string[];
export declare function translate(words: any[], dictionary: Map<string, string>): Word[];
export declare const _: unique symbol;
export declare function reg(words: Word[], handler: LanguageRuleHandler): void;
export declare type Word = string | typeof _;
export declare function parse(simulation: Simulation, speaker: Character, listener: Character, speech: string): Promise<void>;
export {};
