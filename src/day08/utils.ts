import { getData } from '../utils';

export type Register = { [key: string]: number };

export enum Command {
  Increase = 'inc',
  Decrease = 'dec',
}

export interface InstructionInterface {
  key: string;
  cmd: Command;
  value: number;
  conditionKey: string;
  condition: string;
}

export async function loadData(trainingData = false): Promise<InstructionInterface[]> {
  const data = await getData(8, trainingData);

  return data.map((line) => {
    const [key, cmd, value] = line.split(' ');
    const condition = line.split(' if ').at(-1);

    return {
      key,
      cmd,
      value: parseInt(value, 10),
      conditionKey: condition.split(' ')[0],
      condition,
    } as InstructionInterface;
  });
}
