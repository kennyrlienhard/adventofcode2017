import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<string[]> {
  return getData(9, trainingData);
}
