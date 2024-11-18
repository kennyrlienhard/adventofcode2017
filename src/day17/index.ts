// import { printBuffer } from './utils';

const IS_TRAINING = false;

const STEPS = IS_TRAINING ? 3 : 314;

async function partOne() {
  const INSERT = 2017;

  let buffer = [0];
  let currentIndex = 0;

  for (let i = 1; i <= INSERT; i += 1) {
    const index = (STEPS + currentIndex) % buffer.length;
    buffer = [...buffer.slice(0, index + 1), i, ...buffer.slice(index + 1)];

    currentIndex = index + 1;
  }

  // printBuffer(buffer.slice(currentIndex - 3, currentIndex + 4), INSERT);

  return buffer[currentIndex + 1];
}

async function partTwo() {
  const INSERT = IS_TRAINING ? 9 : 50_000_000;

  let currentIndex = 0;

  let afterZero = null;
  let bufferLength = [0].length;

  for (let i = 1; i <= INSERT; i += 1) {
    const index = (STEPS + currentIndex) % bufferLength;
    if (index === 0) afterZero = i;

    bufferLength += 1;
    currentIndex = index + 1;
  }

  return afterZero;
}

export default [partOne, partTwo];
