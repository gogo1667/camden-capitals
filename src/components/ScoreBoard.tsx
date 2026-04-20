type ScoreBoardProps = {
  roundNumber: number;
  totalRounds: number;
  score: number;
};

export function ScoreBoard({ roundNumber, totalRounds, score }: ScoreBoardProps) {
  return (
    <header className="scoreboard">
      <p className="chip">Round {roundNumber} / {totalRounds}</p>
      <p className="chip">Score: {score}</p>
    </header>
  );
}
