import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameSetup from '@/components/features/Game/GameSetup/GameSetup';
import { GameProvider } from '@/context/GameContext';
import { ReactNode } from 'react';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const continents = ['Europe', 'Asia', 'Africa'];

const wrapper = ({ children }: { children: ReactNode }) => (
  <GameProvider>{children}</GameProvider>
);

const renderSetup = (props = {}) =>
  render(<GameSetup continents={continents} {...props} />, { wrapper });

describe('GameSetup', () => {
  it('renders "All" continent button', () => {
    renderSetup();
    expect(screen.getByRole('button', { name: 'Select all continents' })).toBeInTheDocument();
  });

  it('renders a button for each continent', () => {
    renderSetup();
    continents.forEach((c) => {
      expect(screen.getByRole('button', { name: `Select continent ${c}` })).toBeInTheDocument();
    });
  });

  it('question count buttons are hidden before continent is selected', () => {
    renderSetup();
    expect(screen.queryByRole('button', { name: 'Select 5 questions' })).not.toBeInTheDocument();
  });

  it('question count buttons appear after selecting a continent', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: 'Select all continents' }));
    expect(screen.getByRole('button', { name: 'Select 5 questions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select 10 questions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select 20 questions' })).toBeInTheDocument();
  });

  it('"Start Quiz" button is hidden until both continent and count are selected', () => {
    renderSetup();
    expect(screen.queryByRole('button', { name: 'Start Quiz' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Select all continents' }));
    expect(screen.queryByRole('button', { name: 'Start Quiz' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Select 10 questions' }));
    expect(screen.getByRole('button', { name: 'Start Quiz' })).toBeInTheDocument();
  });

  it('selected continent button has aria-pressed=true', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: 'Select all continents' }));
    expect(screen.getByRole('button', { name: 'Select all continents' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('selected question count button has aria-pressed=true', () => {
    renderSetup();
    fireEvent.click(screen.getByRole('button', { name: 'Select all continents' }));
    fireEvent.click(screen.getByRole('button', { name: 'Select 5 questions' }));
    expect(screen.getByRole('button', { name: 'Select 5 questions' })).toHaveAttribute('aria-pressed', 'true');
  });
});
