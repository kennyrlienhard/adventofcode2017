import { DanceInterface, loadData, Move } from './utils';

const IS_TRAINING = false;

const NO_PROGRAMS = IS_TRAINING ? 5 : 16;

function performDance(input: string[], steps: DanceInterface[]) {
  const result = [...input];

  for (const step of steps) {
    switch (step.move) {
      case Move.Spin:
        const spin = step.a;
        result.unshift(...result.splice(-spin));
        break;
      case Move.Exchange:
      case Move.Partner:
        const [a, b] = [step.a, step.b];
        const i = step.move === Move.Exchange ? a : result.indexOf(a as string);
        const j = step.move === Move.Exchange ? b : result.indexOf(b as string);
        [result[i], result[j]] = [result[j], result[i]];
        break;
      default:
        break;
    }
  }

  return result;
}

async function partOne() {
  const programs = Array.from({ length: NO_PROGRAMS }, (_, i) => String.fromCharCode(97 + i));

  return performDance(programs, await loadData(IS_TRAINING)).join('');
}

async function partTwo() {
  const ROUNDS = 1_000_000_000;

  const dance = await loadData(IS_TRAINING);

  let programs = Array.from({ length: NO_PROGRAMS }, (_, i) => String.fromCharCode(97 + i));

  let cycleDetected = false;
  const seen = new Map<string, number>();

  for (let i = 0; i < ROUNDS; i += 1) {
    programs = performDance(programs, dance);

    const key = programs.join('');
    const previousIndex = seen.get(key);

    if (previousIndex && !cycleDetected) {
      const cycleLength = i - previousIndex;
      i += Math.floor((ROUNDS - i) / cycleLength) * cycleLength;
      cycleDetected = true;
    }

    seen.set(key, i);
  }

  return programs.join('');
}

export default [partOne, partTwo];
