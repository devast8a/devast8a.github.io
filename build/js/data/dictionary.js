////////////////////////////////////////////////////////////////////////////////////////////////////
// Translate English used in the development to MayaLang
export const devToMaya = new Map([
    ["MAYA", "MAYA"],
    ////////////////////////////////////////////////////////////////////////////////
    // Markers
    ['QUERY', 'TU'],
    ////////////////////////////////////////////////////////////////////////////////
    // Knowledge
    ['NAME', 'TURE'],
    ['LOCATION', 'TUTA'],
    ['EMOTION', 'TUCI'],
    ////////////////////////////////////////////////////////////////////////////////
    // Commands
    ['FOLLOW', 'FIRU'],
    ////////////////////////////////////////////////////////////////////////////////
    // Things
    ['ROCK', 'AKU'],
    ['WALL', 'LAKU'],
    ['WATERFALL', 'BALAKU'],
    ['CLIFF', 'AKUAKU'],
    ////////////////////////////////////////////////////////////////////////////////
    // Furniture
    ['HOME', 'TATU'],
    ['BED', 'WHUATU'],
    ['CHAIR', 'KAHR'],
    ['DOOR', 'CHAKU'],
    ['TABLE', 'QUTATU'],
    ['DRAWERS', 'CHETU'],
    ['CHEST', 'TULA'],
    ['FLOOR', 'BAAT'],
    ['MAT', 'CHUAT'],
    ['PATH', 'FIRUBAAT'],
    ['BRIDGE', 'BAFIRUBAAT'],
    ['FENCE', 'FIRUAKU'],
    ////////////////////////////////////////////////////////////////////////////////
    // LIFE/TREES
    ['GRASS', 'HUCHA'],
    ['FLOWER', 'LACIHUA'],
    ['SHRUB', 'HUQA'],
    ['TREE', 'QU'],
    ['PILLAR', 'QUAKU'],
    ['STATUE', 'BAKU'],
    ////////////////////////////////////////////////////////////////////////////////
    // Directions
    ['UP', 'BITUA'],
    ['LEFT', 'LATUA'],
    ['RIGHT', 'TALATUA'],
    ['DOWN', 'BATUA'],
    ////////////////////////////////////////////////////////////////////////////////
    // Water related
    ['WATER', 'BA'],
    ['OCEAN', 'BATU'],
    ['POT', 'WHUBATU'],
    ['RIVER', 'FIRUBATU'],
    ['WELL', 'BABAAT'],
    ////////////////////////////////////////////////////////////////////////////////
    // Fire Related
    ['FIRE', 'BI'],
    ['TORCH', 'BITU'],
    ['FIREPLACE', 'BITAKU'],
    ////////////////////////////////////////////////////////////////////////////////
    // Emotions
    ['HAPPY', 'LACI'],
    ['SAD', 'WHUCI'],
    ['SCARED', 'BACI'],
    ['ANGRY', 'BICI'],
    ////////////////////////////////////////////////////////////////////////////////
    // Pronouns
    ['SELF', 'CHU'],
    ['YOU', 'CHI'],
    ['GROUP', 'CHA'],
    ['THAT', 'CHE'],
    ////////////////////////////////////////////////////////////////////////////////
    // Yes/No
    ['YES', 'JI'],
    ['NO', 'TA'],
    ////////////////////////////////////////////////////////////////////////////////
    // Numbers
    ['ONE', 'HU'],
    ['TWO', 'HI'],
    ['THREE', 'HA'],
    ['FOUR', 'LU'],
    ['FIVE', 'LI'],
    ['SIX', 'LA'],
    ['SMALL', 'WHU'],
    ['LARGE', 'LAQU'],
]);
export const mayaToPlayer = new Map([
    ["MAYA", "MAYA"],
]);
export const playerToMaya = new Map([
    ["MAYA", "MAYA"],
]);
export const mayaToDev = new Map([
    ["MAYA", "MAYA"],
]);
for (const [key, value] of devToMaya) {
    // Translate MayaLang back into English used in development
    mayaToDev.set(value, key);
    // Allow the player to speak MayaLang directly
    playerToMaya.set(value, value);
}
// Make sure we didn't screw anything up
if (new Set(devToMaya.values()).size !== devToMaya.size) {
    console.log('== Duplicate word in dictionary');
}
// For debugging purposes automatically add translations for the following words.
//export const debugging = Array.from(devToMaya.keys());
//
//for(const word of debugging){
//    const translation = devToMaya.get(word)!;
//    playerToMaya.set(word, translation);
//    mayaToPlayer.set(translation, word);
//}
//# sourceMappingURL=dictionary.js.map