import { getData } from '../utils';

type Layer = [depth: number, range: number];

export async function loadData(trainingData = false): Promise<Layer[]> {
  return (await getData(13, trainingData)).map((line) => {
    const [depth, range] = line.split(': ').map(Number);
    return [depth, range];
  });
}
