import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Question from '@/components/features/Quiz/Question/Question';
import type { QuizQuestion } from '@/utils/generateQuestions';
import { ANSWER_REVEAL_DELAY_MS } from '@/constants';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const question: QuizQuestion = {
  country: 'France',
  correct: 'Paris',
  options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
};

const defaultProps = {
  question,
  questionNumber: 1,
  totalQuestions: 10,
  onAnswer: vi.fn(),
  onRestart: vi.fn(),
};

describe('Question', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the country name in the question', () => {
    render(<Question {...defaultProps} />);
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('renders all 4 options', () => {
    render(<Question {...defaultProps} />);
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Rome')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
  });

  it('shows question progress badge', () => {
    render(<Question {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onAnswer(true) after delay when correct option clicked', () => {
    render(<Question {...defaultProps} />);
    fireEvent.click(screen.getByText('Paris'));
    expect(defaultProps.onAnswer).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(ANSWER_REVEAL_DELAY_MS); });
    expect(defaultProps.onAnswer).toHaveBeenCalledWith(true);
  });

  it('calls onAnswer(false) after delay when wrong option clicked', () => {
    render(<Question {...defaultProps} />);
    fireEvent.click(screen.getByText('Berlin'));

    act(() => { vi.advanceTimersByTime(ANSWER_REVEAL_DELAY_MS); });
    expect(defaultProps.onAnswer).toHaveBeenCalledWith(false);
  });

  it('disables all options after selecting one', () => {
    render(<Question {...defaultProps} />);
    fireEvent.click(screen.getByText('Paris'));

    const buttons = screen.getAllByRole('radio');
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it('restart button opens the confirm modal', () => {
    render(<Question {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Restart quiz' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('confirming restart modal calls onRestart', () => {
    render(<Question {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Restart quiz' }));
    fireEvent.click(screen.getByText('Yes'));
    expect(defaultProps.onRestart).toHaveBeenCalledTimes(1);
  });

  it('cancelling restart modal does not call onRestart', () => {
    render(<Question {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Restart quiz' }));
    fireEvent.click(screen.getByText('No'));
    expect(defaultProps.onRestart).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
