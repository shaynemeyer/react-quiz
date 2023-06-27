import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import { Question } from '../types/Questions';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';

interface AppState {
  questions: Question[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
}

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
} as AppState;

type DataReceived = { type: 'dataReceived'; payload: Question[] };
type DataFailed = { type: 'dataFailed' };

type AppAction = DataReceived | DataFailed;

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
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

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
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}

export default App;
