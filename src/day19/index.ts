import { loadData } from './utils';

const IS_TRAINING = false;

enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3,
}

const MOVE = {
  [Direction.Up]: [0, -1],
  [Direction.Right]: [1, 0],
  [Direction.Down]: [0, 1],
  [Direction.Left]: [-1, 0],
};

async function run(): Promise<[letters: string, steps: number]> {
  const [start, data] = await loadData(IS_TRAINING);

  let direction = Direction.Down;
  let position = [...start];

  const visited = new Set<string>();
  let steps = 0;

  while (true) {
    const [x, y] = position;
    const current = data[y][x];

    if (current === ' ') {
      break;
    }

    if (current === '+') {
      if (direction === Direction.Up || direction === Direction.Down) {
        if (data[y][x - 1] !== ' ') {
          direction = Direction.Left;
        } else {
          direction = Direction.Right;
        }
      } else {
        if (data[y - 1][x] !== ' ') {
          direction = Direction.Up;
        } else {
          direction = Direction.Down;
        }
      }
    }

    position = [x + MOVE[direction][0], y + MOVE[direction][1]];
    steps += 1;

    if (!['+', '-', '|'].includes(current)) {
      visited.add(current);
    }
  }

  return [Array.from(visited).join(''), steps];
}

export default [async () => (await run())[0], async () => (await run())[1]];
