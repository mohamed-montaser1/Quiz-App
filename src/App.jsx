import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { StatusWidget } from "./components/status/StatusWidget";

const initialState = {
  questions: [],
  // valid status ==> 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
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
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;

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
        <StatusWidget status={status} questionsLength={questionsLength} />
      </Main>
    </div>
  );
}

export default App;
