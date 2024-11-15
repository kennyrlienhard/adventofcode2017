import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<string[]> {
  return (await getData(11, trainingData))[0].split(',');
}
