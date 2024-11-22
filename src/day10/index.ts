import { getData } from '../utils';

import { SUFFIX, loadData, hash, knotHash } from './utils';

async function partOne() {
  const result = hash(await loadData(), 1);
  return result[0] * result[1];
}

async function partTwo() {
  const [input] = await getData(10, false);
  const lengths = [...input.split('').map((v) => v.charCodeAt(0)), ...SUFFIX];

  return knotHash(lengths);
}

export default [partOne, partTwo];
