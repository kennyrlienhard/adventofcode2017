import { getData } from '../utils';

function getSum(chars: string[], step = 1) {
  let sum = 0;

  for (let index = 0; index < chars.length; index += 1) {
    const pairIndex = index + step < chars.length ? index + step : index + step - chars.length;
    if (chars[index] === chars[pairIndex]) sum += parseInt(chars[index], 10);
  }

  return sum;
}

async function partOne() {
  const [data] = await getData(1, false);
  return getSum(data.split(''));
}

async function partTwo() {
  const [data] = await getData(1, false);
  return getSum(data.split(''), data.length / 2);
}

export default [partOne, partTwo];
