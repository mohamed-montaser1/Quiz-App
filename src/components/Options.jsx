export default function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((option) => (
        <Option option={option} key={option}  />
      ))}
    </div>
  );
}

function Option({ option }) {
  return <button className="btn btn-option">{option}</button>;
}
