export default function Progress({ index, questionsLength, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={questionsLength} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsLength}
      </p>

      <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  );
}
