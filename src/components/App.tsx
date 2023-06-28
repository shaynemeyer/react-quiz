import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import { SingleQuestion } from '../types/Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';

interface AppState {
  questions: SingleQuestion[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
}

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
} as AppState;

type DataReceived = { type: 'dataReceived'; payload: SingleQuestion[] };
type DataFailed = { type: 'dataFailed' };
type Start = { type: 'start' };
type NewAnswer = { type: 'newAnswer'; payload: number };
type NextQuestion = { type: 'nextQuestion' };
type Finish = { type: 'finish' };
type Restart = { type: 'restart' };

export type AppAction =
  | DataReceived
  | DataFailed
  | Start
  | NewAnswer
  | NextQuestion
  | Finish
  | Restart;

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'newAnswer': {
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
      };
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      const result = await fetch('http://localhost:8000/questions');
      const data = await result.json();
      dispatch({ type: 'dataReceived', payload: data });
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === 'finished' && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
