import { getData } from '../utils';

export enum Move {
  Spin = 's',
  Exchange = 'x',
  Partner = 'p',
}

export interface DanceInterface {
  move: Move;
  a: number | string;
  b: number | string;
}

export async function loadData(trainingData = false): Promise<DanceInterface[]> {
  const result = [];

  const [data] = await getData(16, trainingData);

  for (const line of data.split(',')) {
    if (line[0] === 's') {
      result.push({ move: Move.Spin, a: Number(line.slice(1)) });
    } else if (line[0] === 'x') {
      const [a, b] = line.slice(1).split('/').map(Number);
      result.push({ move: Move.Exchange, a, b });
    } else if (line[0] === 'p') {
      const [a, b] = line.slice(1).split('/');
      result.push({ move: Move.Partner, a, b });
    }
  }

  return result;
}
