import Loader from "./Loader";
import Error from "./Error";
import { Ready } from "./Ready";
import Question from "../Question";
import NextButton from "../NextButton";
import Progress from "../Progress";
import Finished from "./Finished";

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
    return (
      <>
        <Progress
          index={props.index}
          questionsLength={props.questionsLength}
          points={props.points}
          totalPoints={props.totalPoints}
          answer={props.answer}
        />
        <Question
          question={props.question}
          dispatch={props.dispatch}
          answer={props.answer}
        />
        <NextButton
          dispatch={props.dispatch}
          answer={props.answer}
          index={props.index}
          questionsLength={props.questionsLength}
        />
      </>
    );
  }

  if (status === "finished") {
    return (
      <Finished
        points={props.points}
        totalPoints={props.totalPoints}
        highscore={props.highscore}
      />
    );
  }
}
