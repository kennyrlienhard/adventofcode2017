import { getData } from '../utils';

export async function loadData(trainingData = false): Promise<{ [key: string]: Set<number> }> {
  const result = {} as { [key: string]: Set<number> };

  const data = await getData(12, trainingData);

  for (const line of data) {
    const [key, items] = line.split(' <-> ');
    const values = items.replace(/ /g, '').split(',').map(Number);
    if (!result[key]) result[key] = new Set<number>([Number(key)]);
    result[key] = new Set<number>([...result[key], ...values]);
  }

  return result;
}
