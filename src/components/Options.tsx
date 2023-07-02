import { useQuiz } from '../context/QuizContext';
import { SingleQuestion } from '../types/Questions';
interface OptionsProps {
  question: SingleQuestion;
}

export default function Options({ question }: OptionsProps) {
  const { selectOption, answer } = useQuiz();

  const hasAnswered = answer !== undefined;

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
          onClick={() => selectOption(`${index}`)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
