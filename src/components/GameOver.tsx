type GameOverProps = {
  score: number;
  totalRounds: number;
  onPlayAgain: () => void;
};

export function GameOver({ score, totalRounds, onPlayAgain }: GameOverProps) {
  return (
    <section className="card game-over">
      <h2>Game complete!</h2>
      <p className="final-score">
        Final score: <strong>{score} / {totalRounds}</strong>
      </p>
      <button type="button" className="primary-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </section>
  );
}
