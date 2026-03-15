'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type GamePhase = 'start' | 'setup' | 'quiz';

type GameContextType = {
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;
  selectedContinent: string | null;
  setSelectedContinent: (continent: string | null) => void;
  questionCount: number | null;
  setQuestionCount: (count: number | null) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
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
    <GameContext.Provider
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
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
