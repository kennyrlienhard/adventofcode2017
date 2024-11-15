import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[]> {
  const data = await getData(5, trainingData);
  return data.map((val) => parseInt(val), 10);
}
