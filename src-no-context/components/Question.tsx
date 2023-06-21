import { Action, Question } from "../App";
import Options from "./Options";

function Question({
  question,
  dispatch,
  answer,
}: {
  question: Question;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
export default Question;
