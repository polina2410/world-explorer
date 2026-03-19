import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import QuizPanel from '@/components/features/Quiz/QuizPanel/QuizPanel';
import type { CountryResponse } from '@/types/country';
import { ANSWER_REVEAL_DELAY_MS } from '@/constants';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));
vi.mock('@/hooks/useConfetti', () => ({ useConfetti: vi.fn() }));
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

const mockCountries: CountryResponse[] = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', population: 67000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Germany', capital: 'Berlin', flag: 'de.svg', population: 83000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Italy', capital: 'Rome', flag: 'it.svg', population: 60000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Spain', capital: 'Madrid', flag: 'es.svg', population: 47000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Poland', capital: 'Warsaw', flag: 'pl.svg', population: 38000000, continents: ['Europe'], mapUrl: '' },
];

const mockUseCountries = vi.fn();
vi.mock('@/context/CountriesContext', () => ({
  useCountries: () => mockUseCountries(),
}));

describe('QuizPanel', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('shows loading when countries is null', () => {
    mockUseCountries.mockReturnValue({ countries: null, loading: true, error: null });
    render(<QuizPanel continent="All" questionCount={3} onRestart={vi.fn()} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders a question when countries are available', () => {
    mockUseCountries.mockReturnValue({ countries: mockCountries, loading: false, error: null });
    render(<QuizPanel continent="All" questionCount={3} onRestart={vi.fn()} />);
    expect(screen.getByText(/What is the capital of/i)).toBeInTheDocument();
  });

  it('shows progress badge with total questions', () => {
    mockUseCountries.mockReturnValue({ countries: mockCountries, loading: false, error: null });
    render(<QuizPanel continent="All" questionCount={3} onRestart={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows Result after all questions are answered', () => {
    mockUseCountries.mockReturnValue({ countries: mockCountries, loading: false, error: null });
    render(<QuizPanel continent="All" questionCount={1} onRestart={vi.fn()} />);

    const options = screen.getAllByRole('radio');
    fireEvent.click(options[0]);
    act(() => { vi.advanceTimersByTime(ANSWER_REVEAL_DELAY_MS); });

    expect(screen.getByText(/Quiz Finished/i)).toBeInTheDocument();
  });

  it('calls onRestart when restarting from result screen', () => {
    const onRestart = vi.fn();
    mockUseCountries.mockReturnValue({ countries: mockCountries, loading: false, error: null });
    render(<QuizPanel continent="All" questionCount={1} onRestart={onRestart} />);

    const options = screen.getAllByRole('radio');
    fireEvent.click(options[0]);
    act(() => { vi.advanceTimersByTime(ANSWER_REVEAL_DELAY_MS); });

    fireEvent.click(screen.getByRole('button', { name: 'Restart quiz' }));
    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
