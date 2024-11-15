import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<number[][]> {
  const separator = trainingData ? ' ' : '	';
  return (await getData(2, trainingData)).map((line) => line.split(separator).map((val) => parseInt(val, 10)));
}
