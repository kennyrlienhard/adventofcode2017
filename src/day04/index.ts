import { loadData } from './utils';

const IS_TRAINING = false;

async function partOne() {
  const passphrases = await loadData(IS_TRAINING);

  const isValid = (words: string[]) => !words.find((word, i) => [...words.slice(0, i), ...words.slice(i + 1)].includes(word));

  return passphrases.filter(isValid).length;
}

async function partTwo() {
  const passphrases = await loadData(IS_TRAINING);

  const isValid = (words: string[]) =>
    !words.find((word, i) => {
      return [...words.slice(0, i), ...words.slice(i + 1)].find((w) => {
        if (w.length !== word.length) return false;

        const letters = w.split('');

        const found = word.split('').filter((char) => {
          const index = letters.indexOf(char);
          letters.splice(index, 1);
          return index >= 0;
        });

        return found.length === word.length;
      });
    });

  return passphrases.filter(isValid).length;
}

export default [partOne, partTwo];
