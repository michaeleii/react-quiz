import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, highscore, dispatch, questions } = useQuiz();
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥳";
  else if (percentage >= 80) emoji = "😀";
  else if (percentage >= 60) emoji = "🙂";
  else if (percentage >= 40) emoji = "😕";
  else if (percentage >= 20) emoji = "😟";
  else emoji = "😭";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
export default FinishScreen;
