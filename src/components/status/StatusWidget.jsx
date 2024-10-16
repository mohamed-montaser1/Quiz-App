import Loader from "./Loader";
import Error from "./Error";
import { Ready } from "./Ready";
import Question from "../Question";

export function StatusWidget(props) {
  const { status } = props;
  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <Error />;
  }

  if (status === "ready") {
    return <Ready length={props.questionsLength} dispatch={props.dispatch} />;
  }

  if (status === "active") {
    return <Question question={props.question} />;
  }
}
