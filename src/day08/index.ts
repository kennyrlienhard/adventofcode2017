import { Command, Register, loadData } from './utils';

const IS_TRAINING = false;

async function createRegisters(): Promise<[Register, number]> {
  const instructions = await loadData(IS_TRAINING);

  const register = {} as Register;
  let highestValue = 0;

  for (const instruction of instructions) {
    register[instruction.conditionKey] = register[instruction.conditionKey] || 0;
    register[instruction.key] = register[instruction.key] || 0;

    if (eval(instruction.condition.replace(instruction.conditionKey, `${register[instruction.conditionKey]}`))) {
      register[instruction.key] += (instruction.cmd === Command.Increase ? 1 : -1) * instruction.value;
    }

    const [key] = Object.keys(register).sort((a, b) => register[b] - register[a]);
    if (register[key] > highestValue) highestValue = register[key];
  }

  return [register, highestValue];
}

async function partOne() {
  const [register] = await createRegisters();
  const [highestKey] = Object.keys(register).sort((a, b) => register[b] - register[a]);

  return register[highestKey];
}

async function partTwo() {
  return (await createRegisters())[1];
}

export default [partOne, partTwo];
