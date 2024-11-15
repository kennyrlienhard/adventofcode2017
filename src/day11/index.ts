import { loadData } from './utils';

const IS_TRAINING = false;

const DIRECTIONS = {
  n: [0, 1],
  ne: [1, 1],
  se: [1, 0],
  s: [0, -1],
  sw: [-1, -1],
  nw: [-1, 0],
};

function countSteps(origin: [number, number], pos: [number, number]) {
  let result = 0;

  while (pos.join(',') !== origin.join(',')) {
    if (pos[0] === 0) {
      pos[1] = pos[1] > 0 ? pos[1] - 1 : pos[1] + 1;
    } else if (pos[1] === 0) {
      pos[0] = pos[0] > 0 ? pos[0] - 1 : pos[0] + 1;
    } else {
      pos[0] = pos[0] > 0 ? pos[0] - 1 : pos[0] + 1;
      pos[1] = pos[1] > 0 ? pos[1] - 1 : pos[1] + 1;
    }
    result += 1;
  }

  return result;
}

async function partOne() {
  const origin = [0, 0] as [number, number];
  const position = [0, 0] as [number, number];

  const directions = await loadData(IS_TRAINING);

  for (const direction of directions) {
    const [dx, dy] = DIRECTIONS[direction];
    position[0] += dx;
    position[1] += dy;
  }

  return countSteps(origin, position);
}

async function partTwo() {
  const origin = [0, 0] as [number, number];
  const position = [0, 0] as [number, number];

  let maxSteps = 0;

  const uniquePositions = new Set<string>();

  const directions = await loadData(IS_TRAINING);

  for (const direction of directions) {
    const [dx, dy] = DIRECTIONS[direction];
    position[0] += dx;
    position[1] += dy;

    if (uniquePositions.has(position.join(','))) continue;

    uniquePositions.add(position.join(','));
    const steps = countSteps(origin, [...position]);
    if (steps > maxSteps) maxSteps = steps;
  }

  return maxSteps;
}

export default [partOne, partTwo];
