import { AppAction } from './App';

interface StartScreenProps {
  numQuestions: number;
  dispatch: React.Dispatch<AppAction>;
}

export default function StartScreen({
  numQuestions,
  dispatch,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React master</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Start Quiz
      </button>
    </div>
  );
}
