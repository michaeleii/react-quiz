import { createContext, useContext, useReducer } from "react";

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: Question[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

export interface Action {
  type: "dataReceived" | "dataFailed" | "newAnswer";
  payload: string | number | Question[];
}

export interface ActionWithoutPayload {
  type: "start" | "nextQuestion" | "finish" | "restart" | "tick";
}

const SECONDS_PER_QUESTION = 30;

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state: State, action: Action | ActionWithoutPayload): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload as Question[],
        status: "ready",
      };
    case "dataFailed": {
      console.error(action.payload);

      return {
        ...state,
        status: "error",
      };
    }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload as number,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      console.error("Unknown action type", action);
      return state;
  }
}

function useStoreData() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, dispatch };
}

type QuizContextType = ReturnType<typeof useStoreData>;

const QuizContext = createContext<QuizContextType | null>(null);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    dispatch,
  } = useStoreData();
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
