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
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer } = state;

  const questionsLength = questions.length;
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
        />
      </Main>
    </div>
  );
}

export default App;
