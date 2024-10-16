export default function NextButton({
  dispatch,
  answer,
  index,
  questionsLength,
}) {
  if (answer === null) return null;
  if (index + 1 === questionsLength) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
