import { useQuiz } from '../context/QuizContext';

export default function StartScreen() {
  const { numQuestions, start } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React master</h3>
      <button
        className="btn btn-ui"
        onClick={() => start()}
      >
        Start Quiz
      </button>
    </div>
  );
}
