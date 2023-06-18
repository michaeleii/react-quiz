import { ActionWithoutPayload } from "../App";

function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: {
  dispatch: React.Dispatch<ActionWithoutPayload>;
  answer: number | null;
  index: number;
  numQuestions: number;
}) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if ((index = numQuestions - 1))
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
export default NextButton;
