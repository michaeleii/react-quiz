import { ActionWithoutPayload } from "../App";

function FinishScreen({
  points,
  maxPoints,
  highscore,
  dispatch,
}: {
  points: number;
  maxPoints: number;
  highscore: number;
  dispatch: React.Dispatch<ActionWithoutPayload>;
}) {
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
