import { useEffect } from "react";
import { ActionWithoutPayload } from "../App";

function Timer({
  dispatch,
  secondsRemaining,
}: {
  dispatch: React.Dispatch<ActionWithoutPayload>;
  secondsRemaining: number;
}) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{seconds < 10 && 0}
      {seconds}
    </div>
  );
}
export default Timer;
