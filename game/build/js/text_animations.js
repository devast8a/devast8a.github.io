export const Animations = {
    upDown: (ctx, x, y, text, time) => {
        ctx.strokeText(text, x, y + 2 * Math.sin(time / 500));
        ctx.fillText(text, x, y + 2 * Math.sin(time / 500));
    },
    leftRight: (ctx, x, y, text, time) => {
        ctx.strokeText(text, x + 2 * Math.sin(time / 500), y);
        ctx.fillText(text, x + 2 * Math.sin(time / 500), y);
    },
    shaky: (ctx, x, y, text, time) => {
        ctx.strokeText(text, x + Math.sin(time), y + Math.sin(time));
        ctx.fillText(text, x + Math.sin(time), y + Math.sin(time));
    },
    wavey: (ctx, x, y, text, time) => {
        for (const char of text) {
            const width = ctx.measureText(char).width;
            ctx.strokeText(char, x, y + 2 * Math.sin((x / 7) + (time / 100)));
            ctx.fillText(char, x, y + 2 * Math.sin((x / 7) + (time / 100)));
            x += width;
        }
    },
    none: (ctx, x, y, text, time) => {
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
    }
};
export class TextDisplay {
    constructor(text, options) {
        this.words = new Array();
        this.displayed = '';
        this.word = 0;
        this.timeToNextWord = 0;
        this.timeFadeout = 0;
        options = options || {};
        this.text = text.toLocaleLowerCase();
        this.words = this.text.split(/ /g);
        this.timeBetweenWords = options.timeBetweenWords === undefined ? 500 : options.timeBetweenWords;
        this.timeFadeout = options.timeFadeout === undefined ? 2500 : options.timeFadeout;
        this.animation = options.animation === undefined ? Animations.none : options.animation;
        this.color = options.color === undefined ? '255,255,255' : options.color;
    }
    display(ctx, x, y, time) {
        x += 16 - ctx.measureText(this.text).width / 2;
        if (this.timeFadeout <= 500) {
            ctx.strokeStyle = `rgba(32,32,32,${this.timeFadeout / 500 * 0.5})`;
            ctx.fillStyle = `rgba(${this.color},${this.timeFadeout / 500})`;
        }
        else {
            ctx.strokeStyle = `rgba(32,32,32,0.5)`;
            ctx.fillStyle = `rgba(${this.color},1)`;
        }
        this.animation(ctx, x, y, this.displayed, time);
        if (this.word < this.words.length) {
            x += ctx.measureText(this.displayed).width;
            ctx.strokeStyle = `rgba(32,32,32,${this.timeToNextWord / this.timeBetweenWords * 0.5})`;
            ctx.fillStyle = `rgba(${this.color},${this.timeToNextWord / this.timeBetweenWords})`;
            this.animation(ctx, x, y, this.words[this.word], time);
        }
    }
    update(time) {
        if (this.timeToNextWord >= this.timeBetweenWords) {
            if (this.displayed.length < this.text.length) {
                this.timeToNextWord = 0;
                this.displayed += this.words[this.word++] + " ";
            }
            else {
                this.timeFadeout -= time;
            }
        }
        else {
            this.timeToNextWord += time;
        }
        if (this.timeFadeout <= 0) {
            if (this.onTimeout !== undefined) {
                this.onTimeout(this);
            }
        }
    }
}
//# sourceMappingURL=text_animations.js.map