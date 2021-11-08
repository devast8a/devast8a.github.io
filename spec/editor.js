import { assemble, Instruction, VirtualMachine } from './specvm.js';
window.addEventListener('load', () => {
    const step = document.getElementById('step');
    const restart = document.getElementById('restart');
    const program = document.getElementById('program');
    const state = document.getElementById('state');
    let vm = new VirtualMachine();
    let code = "";
    step.addEventListener('click', () => {
        try {
            if (code !== program.value) {
                vm = new VirtualMachine();
                code = program.value;
                assemble(vm, code);
            }
            if (vm.halt) {
                return;
            }
            vm.step();
            let html = '';
            // Halt status
            html += vm.halt ? "<b>Halted</b>" : "Running";
            // Registers
            html += `<br/>`;
            html += `<div><b>X: </b>${vm.x}</div>`;
            html += `<div><b>Y: </b>${vm.y}</div>`;
            // Execution Window
            html += `<br/>`;
            html += `== Scheduled Instructions ==<br/>`;
            for (const instruction of vm.window) {
                const opcode = vm.storage[instruction.offset];
                const immediate = vm.storage[(instruction.offset + 1) & 0xFFFF];
                const offset = instruction.offset.toString(16).padStart(4, "0");
                const mnemonic = Instruction[opcode];
                const status = instruction.executed ? "X" : '-';
                html += `${status} ${offset}: ${mnemonic} ${immediate}<br/>`;
            }
            state.innerHTML = html;
        }
        catch (e) {
            state.innerText = e.message;
        }
    });
    restart.addEventListener('click', () => {
        try {
            vm = new VirtualMachine();
            code = program.value;
            assemble(vm, code);
        }
        catch (e) {
            state.innerText = e.message;
        }
    });
});
//# sourceMappingURL=editor.js.map