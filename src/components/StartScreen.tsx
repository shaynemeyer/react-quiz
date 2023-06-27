interface StartScreenProps {
  numQuestions: number;
}

export default function StartScreen({ numQuestions }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React master</h3>
      <button className="btn btn-ui">Start Quiz</button>
    </div>
  );
}
