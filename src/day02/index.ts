import { loadData } from './utils';

async function partOne() {
  const data = await loadData(false);
  return data.map((arr) => Math.max(...arr) - Math.min(...arr)).reduce((sum, val) => sum + val, 0);
}

function getEvenlyDivisibleValues(arr: number[]) {
  for (let i = 0; i < arr.length; i += 1) {
    const others = [...arr.slice(0, i), ...arr.slice(i + 1)];

    for (let j = 0; j < others.length; j++) {
      if (arr[i] % others[j] === 0) return arr[i] / others[j];
    }
  }

  return 0;
}

async function partTwo() {
  const data = await loadData(false);
  return data.map(getEvenlyDivisibleValues).reduce((sum, val) => sum + val, 0);
}

export default [partOne, partTwo];
