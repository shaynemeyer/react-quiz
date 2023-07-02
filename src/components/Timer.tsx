import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Timer() {
  const { tick, secondsRemaining } = useQuiz();

  const minutes = secondsRemaining ? Math.floor(Number(secondsRemaining) / 60) : 0;
  const seconds = secondsRemaining ? secondsRemaining % 60 : 0;

  useEffect(() => {
    const id = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="timer">
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}
