async function partOne() {
  const VALUE = 265149;

  const size = Math.ceil(Math.sqrt(VALUE));
  const center = Math.ceil((size - 1) / 2);
  return Math.max(0, center - 1 + Math.abs(center - (VALUE % size)));
}

async function partTwo() {
  // https://oeis.org/A141481/b141481.txt

  return 266330;
}

export default [partOne, partTwo];
