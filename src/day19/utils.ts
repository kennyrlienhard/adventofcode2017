import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<[[x: number, y: number], string[][]]> {
  const map = [] as string[][];

  const data = await getData(19, trainingData);

  for (let y = 0; y < data.length; y += 1) {
    for (let x = 0; x < data[y].length; x += 1) {
      if (!map[y]) map[y] = [];
      map[y][x] = data[y][x];
    }
  }

  return [[map[0].findIndex((val) => val === '|'), 0], map];
}
