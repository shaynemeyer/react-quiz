import { useEffect } from 'react';
import { AppAction } from './App';

interface TimerProps {
  dispatch: React.Dispatch<AppAction>;
  secondsRemaining: number;
}

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

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
