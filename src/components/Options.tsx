import { SingleQuestion } from '../types/Questions';
import { AppAction } from './App';

interface OptionsProps {
  question: SingleQuestion;
  dispatch: React.Dispatch<AppAction>;
  answer: number | null;
}

export default function Options({ question, dispatch, answer }: OptionsProps) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
