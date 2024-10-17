import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const time = `${mins < 10 ? 0 : ""}${mins}:${
    seconds < 10 ? 0 : ""
  }${seconds}`;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return <div className="timer">{time}</div>;
}
