import { getData } from '../utils';

export type Instruction = [string, number | string, number | string];

export async function loadData(trainingData = false): Promise<Instruction[]> {
  return (await getData(18, trainingData)).map((line) => {
    const [cmd, a, b] = line.split(' ');
    return [cmd, isNaN(Number(a)) ? a : Number(a), isNaN(Number(b)) ? b : Number(b)];
  });
}
