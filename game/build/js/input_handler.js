export class Timer {
    constructor(timeout, callback) {
        this.timeout = timeout;
        this.callback = callback;
        this.handle = setTimeout(this.callback, this.timeout);
    }
    reset() {
        clearTimeout(this.handle);
        this.handle = setTimeout(this.callback, this.timeout);
    }
    cancel() {
        clearTimeout(this.handle);
    }
}
export class InputHandler {
    constructor() {
        this.entered = false;
        this.current = '';
        this.enabled = false;
        this.promiseResolve = undefined;
    }
    onKeyDown(event) {
        if (!this.enabled) {
            return;
        }
        if (this.timer !== undefined) {
            this.timer.reset();
        }
        this.entered = false;
        switch (event.keyCode) {
            case 8:
                this.current = this.current.slice(0, -1);
                break;
            case 13:
                if (this.promiseResolve) {
                    this.resolve(this.current);
                }
                else if (this.handler !== undefined) {
                    this.handler(this.current);
                    this.current = '';
                }
                else {
                    this.entered = true;
                }
                break;
            case 9:
            case 16:
            case 17:
            case 18:
            case 27:
                break;
            default: {
                if (event.key.length === 1) {
                    this.current += event.key.toLocaleLowerCase();
                }
                break;
            }
        }
    }
    resolve(value) {
        if (this.promiseResolve !== undefined) {
            this.promiseResolve(value);
            this.promiseResolve = undefined;
        }
        if (this.timer !== undefined) {
            this.timer.cancel();
            this.timer = undefined;
        }
        this.current = '';
    }
    getInput(timeout = 2000) {
        this.enabled = true;
        if (this.entered) {
            const result = this.current;
            this.current = '';
            this.entered = false;
            return Promise.resolve(result);
        }
        this.timer = new Timer(timeout, () => this.resolve(undefined));
        return new Promise((resolve) => {
            this.promiseResolve = resolve;
        });
    }
    disable() {
        this.enabled = false;
        this.current = '';
    }
}
//# sourceMappingURL=input_handler.js.map