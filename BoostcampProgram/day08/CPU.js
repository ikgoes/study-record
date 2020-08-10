// 간단한 CPU 설계 - 컴퓨터를 구성하는 3가지 요소 중에서 CPU 부분에 대해 이해하고, CPU가 기계어 프로그램을 한 줄씩 실행하는 과정을 구현하는 것이 목표다.

class CPU {
    constructor() { //Register는 PROGRAM-COUNTER 역할을 하는 PC, 그 외에 일반적으로 사용할 수 있는 7개 R1-R7 레지스터를 포함한다.
        this.register = Array(8).fill(0); // 0번지 : PC / 1~7번지 : R1~R7
        this.memory = new Map(); // Main memory
    }
    reset() {
        this.register = Array(8).fill(0);
    }
    load(program) {
        return this.memory.get(program);
    }
    fetch() {
        if (IR[this.register[0]] != undefined)
            this.execute(IR[this.register[0]++]);
        else
            this.reset();
    }
    execute(IR) {
        const instruction = new Map([
            ["LOAD", 1],
            ["STORE", 3],
            ["AND", 5],
            ["OR", 6],
            ["ADD", 7],
            ["SUB", 9],
            ["MOV", 11]
        ]);
        const cmd = IR.split(' ');
        cmd[0] = instruction.get(cmd[0]);
        const operand1 = (cmd[1] != undefined) ? ((cmd[1].includes('R')) ? cmd[1].match(/\d/g) : cmd[1].match(/\w+/g)) : undefined;
        const operand2 = (cmd[2] != undefined) ? ((cmd[2].includes('R')) ? cmd[2].match(/\d/g) : cmd[2].match(/\w+/g)) : undefined;
        const operand3 = (cmd[3] != undefined) ? ((cmd[3].includes('R')) ? cmd[3].match(/\d/g) : cmd[3].match(/\w+/g)) : undefined;
        switch (cmd[0]) {
            case 1:
                this.register[operand1] = this.load(parseInt(this.register[operand2]) + parseInt(this.register[operand3]));
                break;
            case 3:
                if (!cmd[2].includes('#') && cmd[3].includes('#'))
                    this.memory.set(this.register[operand2] + operand3, this.register[operand1]);
                else if (cmd[2].includes('#') && !cmd[3].includes('#'))
                    this.memory.set(operand2 + this.register[operand3], this.register[operand1]);
                else
                    this.memory.set(operand2 + operand3, this.register[operand1]);
                break;
            case 5:
            case 6:
            case 7:
            case 9:
                if (!cmd[2].includes('#') && cmd[3].includes('#'))
                    this.register[operand1] = this.ALU(cmd[0], this.register[operand2], operand3);
                else if (cmd[2].includes('#') && !cmd[3].includes('#'))
                    this.register[operand1] = this.ALU(cmd[0], operand2, this.register[operand3]);
                else if(cmd[2].includes('#') && cmd[3].includes('#'))
                    this.register[operand1] = this.ALU(cmd[0], operand2, operand3);
                else
                    this.register[operand1] = this.ALU(cmd[0], this.register[operand2], this.register[operand3]);
                break;
            case 11:
                this.register[operand1] = operand2;
                break;
        }
        console.log(this.register);
        this.fetch();
    }
    dump() {
        return this.register;
    }
    ALU(op, operand1, operand2) {
        switch (op) {
            case 5:
                return (operand1 & operand2);
                break;
            case 6:
                return (operand1 | operand2);
                break;
            case 7:
                return parseInt(operand1) + parseInt(operand2);
                break;
            case 9:
                return parseInt(operand1) - parseInt(operand2);
                break;
        }
    }
}

const IR = [
    "MOV R4, 0xA0",
    "MOV R5, 0x02",
    "LOAD R1, R4, R5",
    "ADD R2, R1, #4",
    "SUB R3, R1, R2",
    "STORE R3, R4, #4"
];
cpu = new CPU;
console.log("0xA0 + 0x02 \'s memory is set to 10");
cpu.memory.set(0xA0 + 0x02,10);
cpu.fetch();
