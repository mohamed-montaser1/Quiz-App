export function Ready({ length }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz!</h2>
      <h3>{length} question to test your react mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
}
