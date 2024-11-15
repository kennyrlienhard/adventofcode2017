import { loadData } from './utils';

const IS_TRAINING = false;

async function partOne() {
  const [stream] = await loadData(IS_TRAINING);

  return stream
    .replace(/!./g, '')
    .replace(/<[^>]*>/g, '')
    .split('')
    .reduce(
      ([score, deepth], char) => {
        if (char === '{') return [score + deepth++, deepth];
        else if (char === '}') return [score, --deepth];

        return [score, deepth];
      },
      [0, 1]
    )[0];
}

async function partTwo() {
  let garbageCount = 0;

  let stream = (await loadData(IS_TRAINING))[0].replace(/!./g, '');

  let match = null;

  while ((match = /<[^>]*>/.exec(stream))) {
    garbageCount += match[0].length - 2;
    stream = stream.replace(match[0], '');
  }

  return garbageCount;
}

export default [partOne, partTwo];
