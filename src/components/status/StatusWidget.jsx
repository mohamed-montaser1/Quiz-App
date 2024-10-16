import Loader from "./Loader";
import Error from "./Error";
import { Ready } from "./Ready";

export function StatusWidget({ status, questionsLength }) {
  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <Error />;
  }

  if (status === "ready") {
    return <Ready length={questionsLength} />;
  }
}
