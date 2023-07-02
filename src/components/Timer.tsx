import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();

  const minutes = secondsRemaining ? Math.floor(Number(secondsRemaining) / 60) : 0;
  const seconds = secondsRemaining ? secondsRemaining % 60 : 0;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}
