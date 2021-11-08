export var Instruction;
(function (Instruction) {
    Instruction[Instruction["halt"] = 0] = "halt";
    Instruction[Instruction["set"] = 1] = "set";
    Instruction[Instruction["swap"] = 2] = "swap";
    Instruction[Instruction["load"] = 3] = "load";
    Instruction[Instruction["store"] = 4] = "store";
    Instruction[Instruction["branch"] = 5] = "branch";
    Instruction[Instruction["sub"] = 6] = "sub";
    Instruction[Instruction["add"] = 7] = "add";
})(Instruction || (Instruction = {}));
const MASK = 0xFFFF;
const TAKEN = true;
export class VirtualMachine {
    constructor() {
        this.halt = false;
        this.storage = new Uint16Array(256 * 256).fill(0);
        this.x = 0;
        this.y = 0;
        this.ip = 0;
        this.window = [];
        this.prediction = new Array(256 * 256).fill(0).map((value, index) => ((index >> 1) & 1) === 1);
    }
    windowFull() {
        let branches = 0;
        for (const instruction of this.window) {
            const opcode = this.storage[instruction.offset];
            switch (opcode) {
                case Instruction.halt:
                    return true;
                case Instruction.set:
                case Instruction.swap:
                case Instruction.load:
                case Instruction.store:
                case Instruction.sub:
                case Instruction.add:
                    break;
                case Instruction.branch:
                    branches += 1;
                    break;
            }
            if (branches >= 10) {
                return true;
            }
        }
        return false;
    }
    needsShrink() {
        for (let index = 0; index < this.window.length; index++) {
            const instruction = this.window[index];
            const opcode = this.storage[instruction.offset];
            if (opcode === Instruction.branch || opcode === Instruction.halt) {
                return index === 0 ? instruction.executed : true;
            }
            if (!instruction.executed) {
                return false;
            }
        }
        return false;
    }
    chooseInstruction() {
        while (true) {
            const index = Math.floor(Math.random() * this.window.length);
            const instruction = this.window[index];
            const opcode = this.storage[instruction.offset];
            // Don't choose instructions that have already been executed
            if (instruction.executed) {
                continue;
            }
            // Execute halt last
            if (index === 0 || opcode !== Instruction.halt) {
                return index;
            }
        }
    }
    step() {
        // Shrink window
        //  only do this when all instructions up to halt / jump are complete
        if (this.needsShrink()) {
            while (this.window.length > 0 && this.window[0].executed) {
                const instruction = this.window.shift();
                const opcode = this.storage[instruction.offset];
                if (opcode === Instruction.branch || opcode === Instruction.halt) {
                    break;
                }
            }
            return;
        }
        // Grow window
        if (!this.windowFull()) {
            while (!this.windowFull()) {
                this.window.push({
                    executed: false,
                    prediction: this.prediction[this.ip],
                    offset: this.ip,
                });
                // Predict branch outcome
                if (this.storage[this.ip] === Instruction.branch && this.prediction[this.ip] === TAKEN) {
                    this.ip = this.storage[this.ip + 1];
                }
                else {
                    this.ip = (this.ip + 2) & MASK;
                }
            }
            return;
        }
        // Load instruction
        const windowOffset = this.chooseInstruction();
        const instruction = this.window[windowOffset];
        const opcode = this.storage[instruction.offset];
        const immediate = this.storage[(instruction.offset + 1) & MASK];
        // Execute instruction
        instruction.executed = true;
        switch (opcode) {
            case Instruction.halt: {
                this.halt = true;
                break;
            }
            case Instruction.set: {
                this.x = immediate;
                break;
            }
            case Instruction.swap: {
                const temp = this.x;
                this.x = this.y;
                this.y = temp;
                break;
            }
            case Instruction.load: {
                this.y = this.storage[this.x];
                break;
            }
            case Instruction.store: {
                this.storage[this.x] = this.y;
                break;
            }
            case Instruction.branch: {
                const outcome = this.x >= 0;
                if (instruction.prediction !== outcome) {
                    // Ooops, we predicted incorrectly. Rollback execution to the branch instruction.
                    this.window = this.window.slice(0, windowOffset + 1);
                    this.ip = (instruction.offset + 2) & MASK;
                    this.prediction[instruction.offset] = outcome;
                }
                break;
            }
            case Instruction.sub: {
                this.x = (this.x - this.y) & MASK;
                break;
            }
            case Instruction.add: {
                this.x = (this.x + this.y) & MASK;
                break;
            }
            default: {
                // Invalid instruction
                throw new Error("Invalid instruction executed");
            }
        }
    }
}
export function assemble(vm, program) {
    let ip = 0x8000;
    vm.ip = ip;
    for (let line of program.split('\n')) {
        console.log(line);
        line = line.trim();
        if (line.startsWith('#') || line.length === 0) {
            continue;
        }
        const [instruction, immediate] = line.trim().split(' ');
        const opcode = Instruction[instruction];
        if (opcode === undefined) {
            throw new Error(`Unknown instruction: ${line}`);
        }
        vm.storage[ip] = opcode;
        vm.storage[ip + 1] = immediate === undefined ? 0 : parseInt(immediate);
        ip += 2;
    }
}
//# sourceMappingURL=specvm.js.map