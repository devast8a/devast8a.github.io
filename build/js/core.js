export function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(undefined), time);
    });
}
//# sourceMappingURL=core.js.map