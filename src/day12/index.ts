import { loadData } from './utils';

const IS_TRAINING = false;

async function partOne() {
  const LOOK_UP = 0;

  let connections = 0;
  const programs = await loadData(IS_TRAINING);

  const searchPrograms = (key: string, visited = new Set<string>()): number => {
    if (visited.has(key)) return 0;

    visited.add(key);

    if (programs[key].has(LOOK_UP)) return 1;

    for (const neighbor of programs[key]) {
      if (searchPrograms(neighbor.toString(), visited)) {
        return 1;
      }
    }

    return 0;
  };

  Object.keys(programs).forEach((key) => {
    connections += searchPrograms(key);
  });

  return connections;
}

async function partTwo() {
  let groups = 0;
  const programs = await loadData(IS_TRAINING);
  const visited = new Set<string>();

  const addVisits = (key: string): void => {
    if (visited.has(key)) return;

    visited.add(key);

    for (const neighbor of programs[key]) {
      addVisits(neighbor.toString());
    }
  };

  Object.keys(programs).forEach((key) => {
    if (!visited.has(key)) {
      groups += 1;
      addVisits(key);
    }
  });

  return groups;
}

export default [partOne, partTwo];
