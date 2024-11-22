import { SUFFIX, knotHash } from '../day10/utils';

const IS_TRAINING = false;

const INPUT = IS_TRAINING ? 'flqrgnkx' : 'hxtvlmkl';

const GRID_SIZE = 128;

const ADJACENTS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

enum Square {
  Used = '1',
  Free = '0',
}

async function partOne() {
  let result = 0;

  for (let i = 0; i < GRID_SIZE; i += 1) {
    const input = [...`${INPUT}-${i}`.split('').map((c) => c.charCodeAt(0)), ...SUFFIX];
    result += knotHash(input, 'bit').replace(/0+/g, '').length;
  }

  return result;
}

async function partTwo() {
  const grid = [];

  let result = 0;

  for (let i = 0; i < GRID_SIZE; i += 1) {
    const hash = [...`${INPUT}-${i}`.split('').map((c) => c.charCodeAt(0)), ...SUFFIX];
    grid.push(knotHash(hash, 'bit').split(''));
  }

  const isUsed = (x: number, y: number) => grid?.[y]?.[x] === Square.Used;

  const searchRegion = (x: number, y: number) => {
    grid[y][x] = Square.Free;

    ADJACENTS.forEach(([dx, dy]) => {
      if (isUsed(x + dx, y + dy)) searchRegion(x + dx, y + dy);
    });
  };

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if (isUsed(x, y)) {
        result += 1;
        searchRegion(x, y);
      }
    }
  }

  return result;
}

export default [partOne, partTwo];
