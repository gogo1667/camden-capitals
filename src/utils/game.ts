import { CAPITALS, type CapitalEntry } from "../data/capitals";

export const ROUNDS_PER_GAME = 10;
export const ANSWERS_PER_QUESTION = 4;

export type QuizRound = {
  country: string;
  correctCapital: string;
  choices: string[];
};

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function pickUniqueEntries(size: number, pool: CapitalEntry[]): CapitalEntry[] {
  if (size > pool.length) {
    throw new Error(`Requested ${size} rounds, but only ${pool.length} capitals available.`);
  }
  return shuffle(pool).slice(0, size);
}

function getDistractors(correctCapital: string, allCapitals: string[]): string[] {
  const candidates = allCapitals.filter((capital) => capital !== correctCapital);
  return shuffle(candidates).slice(0, ANSWERS_PER_QUESTION - 1);
}

export function buildRounds(
  roundsPerGame: number = ROUNDS_PER_GAME,
  source: CapitalEntry[] = CAPITALS
): QuizRound[] {
  const selected = pickUniqueEntries(roundsPerGame, source);
  const allCapitals = source.map((entry) => entry.capital);

  return selected.map(({ country, capital }) => {
    const distractors = getDistractors(capital, allCapitals);
    return {
      country,
      correctCapital: capital,
      choices: shuffle([capital, ...distractors]),
    };
  });
}
