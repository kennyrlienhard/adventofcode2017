const IS_TRAINING = false;

const FACTOR = [16807, 48271];

const DIVISOR = 2147483647;

const DATA = IS_TRAINING ? [65, 8921] : [783, 325];

function calc(value: number, factor: number) {
  return (value * factor) % DIVISOR;
}

function judge(a: number, b: number) {
  return (a & 0xffff) === (b & 0xffff);
}

async function partOne() {
  const ROUNDS = IS_TRAINING ? 5 : 40_000_000;

  let matches = 0;

  let [a, b] = DATA;

  for (let i = 0; i < ROUNDS; i += 1) {
    a = calc(a, FACTOR[0]);
    b = calc(b, FACTOR[1]);

    if (judge(a, b)) matches += 1;
  }

  return matches;
}

async function partTwo() {
  const ROUNDS = 5_000_000;

  let [a, b] = DATA;
  let matches = 0;

  for (let i = 0; i < ROUNDS; i += 1) {
    do {
      a = calc(a, FACTOR[0]);
    } while (a & 3);

    do {
      b = calc(b, FACTOR[1]);
    } while (b & 7);

    if (judge(a, b)) matches++;
  }

  return matches;
}

export default [partOne, partTwo];
