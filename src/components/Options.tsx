import { useQuiz } from '../context/QuizContext';
import { SingleQuestion } from '../types/Questions';
interface OptionsProps {
  question: SingleQuestion;
}

export default function Options({ question }: OptionsProps) {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === Number(answer) ? 'answer' : ''} ${
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
