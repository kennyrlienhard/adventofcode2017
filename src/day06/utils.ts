import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[]> {
  const [data] = await getData(6, trainingData);
  return data.split('\t').map((val) => parseInt(val, 10));
}
