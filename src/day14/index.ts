import { SUFFIX, knotHash } from '../day10/utils';

const IS_TRAINING = false;

async function partOne() {
  const INPUT = IS_TRAINING ? 'flqrgnkx' : 'hxtvlmkl';

  const GRID_SIZE = 128;

  let result = 0;

  for (let i = 0; i < GRID_SIZE; i += 1) {
    const input = [...`${INPUT}-${i}`.split('').map((c) => c.charCodeAt(0)), ...SUFFIX];
    result += knotHash(input, 'bit').replace(/0+/g, '').length;
  }

  return result;
}

async function partTwo() {
  return 0;
}

export default [partOne, partTwo];
