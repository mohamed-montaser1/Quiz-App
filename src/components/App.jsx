import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { StatusWidget } from "./status/StatusWidget";

const initialState = {
  questions: [],
  // valid status ==> 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions[state.index];
      const incPoints = question.points;
      const correct = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: correct ? state.points + incPoints : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      const { highscore, points } = state;
      const new_high_score = points > highscore ? points : highscore;
      return { ...state, status: "finished", highscore: new_high_score };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore } = state;
  const questionsLength = questions.length;
  const totalPoints = questions.reduce((acc, q) => {
    return acc + q.points;
  }, 0);
  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <StatusWidget
          status={status}
          questionsLength={questionsLength}
          dispatch={dispatch}
          question={questions[index]}
          answer={answer}
          index={index}
          points={points}
          totalPoints={totalPoints}
          highscore={highscore}
        />
      </Main>
    </div>
  );
}

export default App;
