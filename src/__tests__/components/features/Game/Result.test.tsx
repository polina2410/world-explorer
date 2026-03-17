import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Result from '@/components/features/Game/Result/Result';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));
vi.mock('@/hooks/useConfetti', () => ({ useConfetti: vi.fn() }));
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('Result', () => {
  it('shows score and total', () => {
    render(<Result score={7} total={10} onRestart={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveTextContent('7');
    expect(screen.getByRole('status')).toHaveTextContent('10');
  });

  it('shows the percentage', () => {
    render(<Result score={7} total={10} onRestart={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveTextContent('70%');
  });

  it('shows "Perfect Score!" for 100%', () => {
    render(<Result score={10} total={10} onRestart={vi.fn()} />);
    expect(screen.getByText('Perfect Score!')).toBeInTheDocument();
  });

  it('shows "Great Job!" for 70–99%', () => {
    render(<Result score={7} total={10} onRestart={vi.fn()} />);
    expect(screen.getByText('Great Job!')).toBeInTheDocument();
  });

  it('shows "Keep Practicing!" for below 70%', () => {
    render(<Result score={3} total={10} onRestart={vi.fn()} />);
    expect(screen.getByText('Keep Practicing!')).toBeInTheDocument();
  });

  it('calls onRestart when "Start again" is clicked', () => {
    const onRestart = vi.fn();
    render(<Result score={5} total={10} onRestart={onRestart} />);
    fireEvent.click(screen.getByRole('button', { name: 'Restart quiz' }));
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('renders the "Start again" button', () => {
    render(<Result score={0} total={5} onRestart={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Restart quiz' })).toBeInTheDocument();
  });
});
