import { loadData } from './utils';

const IS_TRAINING = false;

async function run(extended = false) {
  const getOffset = (value: number) => (extended ? (value >= 3 ? -1 : 1) : 1);

  const data = await loadData(IS_TRAINING);

  let index = 0;
  let steps = 0;
  const values = [...data];

  do {
    const prevIndex = index;
    index += values[prevIndex];
    values[prevIndex] += getOffset(values[prevIndex]);
    steps += 1;
  } while (index >= 0 && index < data.length);

  return steps;
}

async function partOne() {
  return run();
}

async function partTwo() {
  return run(true);
}

export default [partOne, partTwo];
