import { createContext, useContext, useReducer, useEffect } from "react";
import { SingleQuestion } from "../types/Questions";

interface QuizContextProps {
  questions: Array<SingleQuestion>
  points: number;
  index: number;
  status: string;
  answer?: string;
  numQuestions: number;
  maxPossiblePoints: number;
  highscore?: number;
}

const QuizContext = createContext<QuizContextProps>({ 
  questions: [],
  status: "loading",
  points: 0,
  index: 0,
  answer: '',
  numQuestions: 0,
  maxPossiblePoints: 0
});

const SECS_PER_QUESTION = 30;

interface QuizState {
  questions: Array<SingleQuestion>
  points: number;
  status: string;
  index: number;
  answer: string;
  highscore: number
  numQuestions: number | null;
  secondsRemaining: number | null;
}

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: '',
  points: 0,
  highscore: 0,
  numQuestions: 0,
  secondsRemaining: null,
} as QuizState;

type DataReceived = {
  type: 'dataReceived';
  payload: Array<SingleQuestion>
}
type DataFailed = { type: 'dataFailed' }
type Start = { type: 'start' }
type NewAnswer = { type: 'newAnswer', payload: string }
type NextQuestion = { type: 'nextQuestion' }
type Finish = { type: 'finish' }
type Restart = { type: 'restart' }
type Tick = { type: 'tick' }

type QuizActions = DataReceived | DataFailed | Start | NewAnswer | NextQuestion | Finish | Restart | Tick;

function reducer(state: QuizState, action: QuizActions) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index] as SingleQuestion;

      return {
        ...state,
        answer: action.payload,
        points:
          Number(action.payload) === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: '' };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining ? state.secondsRemaining - 1 : null,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const results = await fetch("http://localhost:9000/questions");
        const data = await results.json() ;
        if (data) {
          dispatch({ type: "dataReceived", payload: data })
        }
      } catch {
        dispatch({ type: "dataFailed" })
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        points,
        status,
        index,
        numQuestions,
        maxPossiblePoints,
        answer,
        highscore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };