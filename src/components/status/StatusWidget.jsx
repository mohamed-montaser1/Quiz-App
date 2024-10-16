import Loader from "./Loader";
import Error from "./Error";
import { Ready } from "./Ready";
import Question from "../Question";

export function StatusWidget({ status, questionsLength, dispatch }) {
  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <Error />;
  }

  if (status === "ready") {
    return <Ready length={questionsLength} dispatch={dispatch} />;
  }

  if (status === "active") {
    return <Question />;
  }
}
