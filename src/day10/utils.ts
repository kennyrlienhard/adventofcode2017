import { getData } from '../utils';

export const SUFFIX = [17, 31, 73, 47, 23];

export const SIZE = 256;

const ROUNDS = 64;

const PREFIX = '0000000';

function encrypt(input: number[], position: number, length: number): number[] {
  let result = [...input];
  result = [...result.slice(position), ...result.slice(0, position)];
  result = [...result.slice(0, length).reverse(), ...result.slice(length)];
  return [...result.slice(-position), ...result.slice(0, -position)];
}

export function hash(input: number[], rounds = ROUNDS, size = SIZE): number[] {
  let position = 0;
  let skipSize = 0;

  let result = Array.from({ length: size }, (_, i) => i);

  for (let i = 0; i < rounds; i += 1) {
    for (const length of input) {
      result = encrypt(result, position, length);
      position = (position + length + skipSize++) % SIZE;
    }
  }

  return result;
}

export function knotHash(input: number[], encoding = 'hex' as 'hex' | 'bit', rounds = ROUNDS, size = SIZE): string {
  const denseHash = [];
  const sparseHash = hash(input, rounds, size);

  const radix = encoding === 'hex' ? 16 : 2;
  const last = encoding === 'hex' ? 2 : 8;

  for (let i = 0; i < SIZE; i += 16) {
    const code = sparseHash.slice(i, i + 16).reduce((a, b) => a ^ b);
    denseHash.push(`${PREFIX}${code.toString(radix)}`.slice(-last));
  }

  return denseHash.join('');

  // for (let i = 0; i < SIZE; i += 16) {
  //   denseHash.push(sparseHash.slice(i, i + 16).reduce((a, b) => a ^ b));
  // }

  // return denseHash.map((v) => `0000000${v.toString(2)}`.slice(-8)).join('');

  // return denseHash.map((v) => `0000000${v.toString(16)}`.slice(-2)).join('');
}

export async function loadData(trainingData = false): Promise<number[]> {
  const [line] = await getData(10, trainingData);
  return line.replace(/\s+/g, '').split(',').map(Number);
}
