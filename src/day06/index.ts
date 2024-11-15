import { loadData } from './utils';

const IS_TRAINING = false;

async function run(): Promise<[steps: number, patterns: string[], pattern: string]> {
  const blocks = await loadData(IS_TRAINING);

  let steps = 0;
  let pattern = blocks.join(';');
  const patterns = new Set() as Set<string>;

  do {
    patterns.add(pattern);

    const [mostBlocks] = blocks.map((val, i) => [val, i]).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
    blocks[mostBlocks[1]] = 0;
    let index = mostBlocks[1];

    for (let i = 0; i < mostBlocks[0]; i += 1) {
      index += 1;
      if (index === blocks.length) index = 0;
      blocks[index] += 1;
    }

    pattern = blocks.join(';');
    steps += 1;
  } while (!patterns.has(pattern));

  return [steps, [...patterns], pattern];
}

async function partOne() {
  return (await run())[0];
}

async function partTwo() {
  const [steps, patterns, pattern] = await run();
  return steps - [...patterns].indexOf(pattern);
}

export default [partOne, partTwo];
