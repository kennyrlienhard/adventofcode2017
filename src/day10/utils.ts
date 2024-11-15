import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[]> {
  const [line] = await getData(10, trainingData);
  return line.replace(/\s+/g, '').split(',').map(Number);
}
