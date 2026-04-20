import { useMemo, useState } from "react";
import { CelebrationOverlay } from "./components/CelebrationOverlay";
import { GameOver } from "./components/GameOver";
import { QuestionCard } from "./components/QuestionCard";
import { ScoreBoard } from "./components/ScoreBoard";
import { WrongAnswerOverlay } from "./components/WrongAnswerOverlay";
import "./App.css";
import { ROUNDS_PER_GAME, buildRounds, type QuizRound } from "./utils/game";

const CELEBRATION_MS = 2000;
const WRONG_MESSAGE_MS = 2000;

function App() {
  const [rounds, setRounds] = useState<QuizRound[]>(() => buildRounds());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showWrongOverlay, setShowWrongOverlay] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentRound = rounds[currentIndex];
  const isGameOver = currentIndex >= rounds.length;
  const roundNumber = currentIndex + 1;

  const subtitle = useMemo(() => {
    if (!hasStarted) {
      return "10 rounds. Pick the capital. Get it right and celebrate!";
    }
    return "Choose one answer each round.";
  }, [hasStarted]);

  const advanceRound = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  const handlePlayAgain = () => {
    setRounds(buildRounds());
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowCelebration(false);
    setShowWrongOverlay(false);
    setHasStarted(true);
  };

  const handlePickAnswer = (answer: string) => {
    if (!currentRound || selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentRound.correctCapital;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setShowCelebration(true);
      window.setTimeout(() => {
        setShowCelebration(false);
        advanceRound();
      }, CELEBRATION_MS);
      return;
    }

    setShowWrongOverlay(true);
    window.setTimeout(() => {
      setShowWrongOverlay(false);
      advanceRound();
    }, WRONG_MESSAGE_MS);
  };

  return (
    <main className="app">
      <h1>Camden&apos;s Country Capitals</h1>
      <p className="subtitle">{subtitle}</p>

      {!hasStarted && (
        <section className="card start-card">
          <p>Ready to play?</p>
          <button type="button" className="primary-btn" onClick={handleStart}>
            Start Game
          </button>
        </section>
      )}

      {hasStarted && !isGameOver && currentRound && (
        <>
          <ScoreBoard
            roundNumber={roundNumber}
            totalRounds={ROUNDS_PER_GAME}
            score={score}
          />
          <QuestionCard
            round={currentRound}
            selectedAnswer={selectedAnswer}
            onPickAnswer={handlePickAnswer}
          />
          <CelebrationOverlay isVisible={showCelebration} />
          <WrongAnswerOverlay isVisible={showWrongOverlay} />
        </>
      )}

      {hasStarted && isGameOver && (
        <GameOver score={score} totalRounds={ROUNDS_PER_GAME} onPlayAgain={handlePlayAgain} />
      )}
    </main>
  );
}

export default App;
