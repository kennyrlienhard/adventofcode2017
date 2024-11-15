import { Disc, loadData } from './utils';

const IS_TRAINING = false;

function getRoot(discs: Disc[]): Disc {
  const withChildren = discs.filter((disc) => disc[2].length);
  const children = withChildren.map((disc) => disc[2]).flat();
  const name = withChildren.map((disc) => disc[0]).find((val) => !children.includes(val));
  return withChildren.find((disc) => disc[0] === name);
}

async function partOne() {
  const data = await loadData(IS_TRAINING);
  return getRoot(data)[0];
}

async function partTwo() {
  const discs = await loadData(IS_TRAINING);
  const root = getRoot(discs);

  function getDiscWeight(disc: Disc) {
    const childrens = disc[2].map((child) => discs.find((d) => d[0] === child));
    return disc[1] + childrens.reduce((a, b) => a + getDiscWeight(b), 0);
  }

  function findUnbalancedDisc(disc: Disc) {
    if (!disc[2].length) return;

    const childrens = disc[2].map((child) => discs.find((d) => d[0] === child));

    for (const child of childrens) {
      const result = findUnbalancedDisc(child);
      if (result) return result;
    }

    const childrenWeights = childrens.map(getDiscWeight);
    const weights = childrenWeights.reduce((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }), {});

    // all same
    if (Object.keys(weights).length === 1) {
      return;
    } else {
      const wrong = Object.keys(weights).find((key) => weights[key] === 1);
      const correct = Object.keys(weights).find((key) => weights[key] > 1);

      const difference = parseInt(wrong, 10) - parseInt(correct, 10);
      const indexWrongDisc = childrenWeights.indexOf(parseInt(wrong, 10));

      return [childrens[indexWrongDisc], difference];
    }
  }

  const [wrongDisc, difference] = findUnbalancedDisc(root);

  return wrongDisc[1] - difference;
}

export default [partOne, partTwo];
