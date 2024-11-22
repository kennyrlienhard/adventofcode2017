import { loadData } from './utils';

const IS_TRAINING = false;

function caughtByGuard(delay: number) {
  return ([d, r]) => (delay + d) % (2 * (r - 1)) === 0;
}

async function partOne() {
  const guards = await loadData(IS_TRAINING);
  return guards.filter(caughtByGuard(0)).reduce((n, [d, r]) => n + d * r, 0);
}

async function partTwo() {
  const guards = await loadData(IS_TRAINING);

  let delay = -1;
  while (guards.some(caughtByGuard((delay += 1))));

  return delay;
}

export default [partOne, partTwo];
