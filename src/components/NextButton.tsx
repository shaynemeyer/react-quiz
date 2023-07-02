import { useQuiz } from '../context/QuizContext';

export default function NextButton() {
  const { nextQuestion, finish, answer, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => nextQuestion()}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => finish()}
      >
        Finish
      </button>
    );
  }
}
