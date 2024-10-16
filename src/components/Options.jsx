export default function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => {
        const hasAnswer = answer !== null;
        const correctAnswer = index === question.correctOption;
        const isSelected = index === answer ? "answer" : "";
        const type = hasAnswer ? (correctAnswer ? "correct" : "wrong") : "";
        const classNames = `btn btn-option ${isSelected} ${type}`;
        return (
          <button
            className={classNames}
            key={option}
            disabled={answer !== null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
