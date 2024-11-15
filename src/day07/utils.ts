import { getData } from '../utils';

export type Disc = [name: string, weight: number, children: string[]];

export async function loadData(trainingData = false): Promise<Disc[]> {
  const data = await getData(7, trainingData);

  return data.map((line) => {
    const [name] = line.split(' ');
    const weight = parseInt(/\(([^)]+)\)/.exec(line)[1], 10);
    const children = line.includes(' -> ') ? line.split(' -> ').at(-1).split(', ') : [];
    return [name, weight, children];
  });
}
