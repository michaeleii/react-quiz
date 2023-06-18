function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}: {
  index: number;
  numQuestions: number;
  points: number;
  maxPoints: number;
  answer: number | null;
}) {
  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
export default Progress;
