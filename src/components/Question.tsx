import { SingleQuestion } from '../types/Questions';
import { AppAction } from './App';
import Options from './Options';

interface QuestionProps {
  question: SingleQuestion;
  dispatch: React.Dispatch<AppAction>;
  answer: number | null;
}

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>

      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
