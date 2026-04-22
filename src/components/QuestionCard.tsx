import type { QuizRound } from "../utils/game";

type QuestionCardProps = {
  round: QuizRound;
  selectedAnswer: string | null;
  onPickAnswer: (answer: string) => void;
};

export function QuestionCard({ round, selectedAnswer, onPickAnswer }: QuestionCardProps) {
  const place = round.kind === "us_state" ? "this state" : "this country";

  return (
    <section className="card question-card">
      <p className="prompt">What is the capital of {place}?</p>
      <h2>{round.country}</h2>
      <div className="answer-grid">
        {round.choices.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          return (
            <button
              type="button"
              key={`${round.country}-${index}-${answer}`}
              className={`answer-btn${isSelected ? " selected" : ""}`}
              onClick={() => onPickAnswer(answer)}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </section>
  );
}
