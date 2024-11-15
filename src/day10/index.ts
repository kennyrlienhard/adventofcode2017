import { getData } from '../utils';

import { loadData } from './utils';

const IS_TRAINING = false;

function encrypt(input: number[], position: number, length: number): number[] {
  let result = [...input];
  result = [...result.slice(position), ...result.slice(0, position)];
  result = [...result.slice(0, length).reverse(), ...result.slice(length)];
  return [...result.slice(-position), ...result.slice(0, -position)];
}

async function partOne() {
  const SIZE = IS_TRAINING ? 5 : 256;

  let list = Array(SIZE)
    .fill(0)
    .map((_, i) => i);

  let position = 0;
  let skipSize = 0;

  for (const length of await loadData(IS_TRAINING)) {
    list = encrypt(list, position, length);
    position = (position + length + skipSize++) % 256;
  }

  return list[0] * list[1];
}

async function partTwo() {
  const SIZE = 256;

  const ROUNDS = 64;

  const SUFFIX = [17, 31, 73, 47, 23];

  let sparseHash = Array.from({ length: SIZE }, (_, i) => i);
  const denseHash = [];

  const [input] = IS_TRAINING ? [''] : await getData(10, IS_TRAINING);
  const lengths = [...input.split('').map((v) => v.charCodeAt(0)), ...SUFFIX];

  let position = 0;
  let skipSize = 0;

  for (let i = 0; i < ROUNDS; i += 1) {
    for (const length of lengths) {
      sparseHash = encrypt(sparseHash, position, length);
      position = (position + length + skipSize++) % 256;
    }
  }

  for (let i = 0; i < SIZE; i += 16) {
    denseHash.push(sparseHash.slice(i, i + 16).reduce((acc, v) => acc ^ v));
  }

  return denseHash.map((v) => `0${v.toString(16)}`.slice(-2)).join('');
}

export default [partOne, partTwo];
