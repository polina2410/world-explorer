'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type GamePhase = 'start' | 'setup' | 'quiz';

type QuizContextType = {
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;
  selectedContinent: string | null;
  setSelectedContinent: (continent: string | null) => void;
  questionCount: number | null;
  setQuestionCount: (count: number | null) => void;
  resetGame: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [questionCount, setQuestionCount] = useState<number | null>(null);

  const resetGame = () => {
    setPhase('start');
    setSelectedContinent(null);
    setQuestionCount(null);
  };

  return (
    <QuizContext.Provider
      value={{
        phase,
        setPhase,
        selectedContinent,
        setSelectedContinent,
        questionCount,
        setQuestionCount,
        resetGame,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}