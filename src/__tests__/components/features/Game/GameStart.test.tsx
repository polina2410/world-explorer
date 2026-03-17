import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameStart from '@/components/features/Game/GameStart/GameStart';
import { GameProvider, useGame } from '@/context/GameContext';
import { ReactNode, useEffect } from 'react';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const wrapper = ({ children }: { children: ReactNode }) => (
  <GameProvider>{children}</GameProvider>
);

describe('GameStart', () => {
  it('renders the quiz title', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByText(/Countries Quiz/)).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByText(/Choose a region/i)).toBeInTheDocument();
  });

  it('renders the Start button', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByRole('button', { name: 'Start countries quiz' })).toBeInTheDocument();
  });

  it('clicking Start sets phase to "setup"', () => {
    let capturedPhase = '';

    const PhaseCapture = () => {
      const { phase } = useGame();
      useEffect(() => { capturedPhase = phase; }, [phase]);
      return null;
    };

    render(
      <GameProvider>
        <GameStart />
        <PhaseCapture />
      </GameProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Start countries quiz' }));
    expect(capturedPhase).toBe('setup');
  });
});
