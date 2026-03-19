import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizStart from '@/components/features/Quiz/QuizStart/QuizStart';
import { QuizProvider, useQuiz } from '@/context/QuizContext';
import { ReactNode, useEffect } from 'react';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QuizProvider>{children}</QuizProvider>
);

describe('QuizStart', () => {
  it('renders the quiz title', () => {
    render(<QuizStart />, { wrapper });
    expect(screen.getByText(/Countries Quiz/)).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<QuizStart />, { wrapper });
    expect(screen.getByText(/Choose a region/i)).toBeInTheDocument();
  });

  it('renders the Start button', () => {
    render(<QuizStart />, { wrapper });
    expect(screen.getByRole('button', { name: 'Start countries quiz' })).toBeInTheDocument();
  });

  it('clicking Start sets phase to "setup"', () => {
    let capturedPhase = '';

    const PhaseCapture = () => {
      const { phase } = useQuiz();
      useEffect(() => { capturedPhase = phase; }, [phase]);
      return null;
    };

    render(
      <QuizProvider>
        <QuizStart />
        <PhaseCapture />
      </QuizProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Start countries quiz' }));
    expect(capturedPhase).toBe('setup');
  });
});
