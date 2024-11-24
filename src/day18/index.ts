import { Instruction, loadData } from './utils';

const IS_TRAINING = false;

function getValue(register: Record<string, number>, value: number | string): number {
  if (isNaN(Number(value))) return register[value] || 0;
  return value as number;
}

class Program {
  id: number;
  index: number;
  instructions: Instruction[];
  register: Record<string, number>;
  queue: number[];
  sent: number;
  lastSound: number;
  linkedProgram: Program;

  constructor(id: number, instructions: Instruction[]) {
    this.id = id;
    this.instructions = instructions;
    this.register = { p: id };
    this.queue = [];
    this.index = 0;
    this.sent = 0;
    this.lastSound = 0;
    this.linkedProgram = null;
  }

  run() {
    let locked = true;

    while (true) {
      const [cmd, a, b] = this.instructions[this.index];

      switch (cmd) {
        case 'snd':
          if (this.linkedProgram) {
            this.linkedProgram.queue.push(getValue(this.register, a));
            this.sent += 1;
          }

          this.lastSound = getValue(this.register, a);
          this.index += 1;
          break;
        case 'set':
          this.register[a] = getValue(this.register, b);
          this.index += 1;
          break;
        case 'add':
          this.register[a] += getValue(this.register, b);
          this.index += 1;
          break;
        case 'mul':
          this.register[a] *= getValue(this.register, b);
          this.index += 1;
          break;
        case 'mod':
          this.register[a] %= getValue(this.register, b);
          this.index += 1;
          break;
        case 'rcv':
          if (this.queue.length) {
            this.register[a] = this.queue.shift();
            this.index += 1;
          } else {
            return locked;
          }
          break;
        case 'jgz':
          if (getValue(this.register, a) > 0) {
            this.index += getValue(this.register, b);
          } else {
            this.index += 1;
          }
          break;
      }

      locked = false;
    }
  }

  link(p: Program) {
    this.linkedProgram = p;
  }
}

async function partOne() {
  const instructions = await loadData(IS_TRAINING);

  const p = new Program(0, instructions);

  while (true) {
    if (p.run()) break;
  }

  return p.lastSound;
}

async function partTwo() {
  const instructions = await loadData(IS_TRAINING);

  const p0 = new Program(0, instructions);
  const p1 = new Program(1, instructions);

  p0.link(p1);
  p1.link(p0);

  while (true) {
    if (p0.run() && p1.run()) break;
  }

  return p1.sent;
}

export default [partOne, partTwo];
