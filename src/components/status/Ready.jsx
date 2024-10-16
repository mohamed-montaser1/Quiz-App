export function Ready({ length, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz!</h2>
      <h3>{length} question to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
