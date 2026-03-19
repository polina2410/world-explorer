import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagMosaic from '@/components/features/HomePage/FlagMosaic';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const mockCountries = [
  {
    name: 'France',
    capital: 'Paris',
    flag: 'fr.svg',
    population: 67000000,
    continents: ['Europe'],
    mapUrl: '',
  },
  {
    name: 'Japan',
    capital: 'Tokyo',
    flag: 'jp.svg',
    population: 125000000,
    continents: ['Asia'],
    mapUrl: '',
  },
  {
    name: 'Germany',
    capital: 'Berlin',
    flag: 'de.svg',
    population: 83000000,
    continents: ['Europe'],
    mapUrl: '',
  },
];

vi.mock('@/context/CountriesContext', () => ({
  useCountries: vi.fn(),
}));

import { useCountries } from '@/context/CountriesContext';
const mockUseCountries = useCountries as ReturnType<typeof vi.fn>;

describe('FlagMosaic', () => {
  it('shows loading state', () => {
    mockUseCountries.mockReturnValue({
      countries: null,
      loading: true,
      error: null,
    });
    render(<FlagMosaic />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error message', () => {
    mockUseCountries.mockReturnValue({
      countries: null,
      loading: false,
      error: 'Failed',
    });
    render(<FlagMosaic />);
    expect(screen.getByText(/Error: Failed/i)).toBeInTheDocument();
  });

  it('renders flag cards when countries load', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      loading: false,
      error: null,
    });
    render(<FlagMosaic />);
    expect(screen.getByAltText('France')).toBeInTheDocument();
    expect(screen.getByAltText('Japan')).toBeInTheDocument();
  });

  it('filters countries by search term', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      loading: false,
      error: null,
    });
    render(<FlagMosaic />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'france' },
    });
    expect(screen.getByAltText('France')).toBeInTheDocument();
    expect(screen.queryByAltText('Japan')).not.toBeInTheDocument();
  });

  it('shows no-match message when search finds nothing', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      loading: false,
      error: null,
    });
    render(<FlagMosaic />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'zzz' },
    });
    expect(
      screen.getByText(/No countries match your search/i)
    ).toBeInTheDocument();
  });

  it('sorts A–Z by default', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      loading: false,
      error: null,
    });
    render(<FlagMosaic />);
    const cards = screen
      .getAllByRole('button')
      .filter((btn) => btn.id.startsWith('flag-card-'));
    // First card should be France (F < G < J alphabetically)
    expect(cards[0]).toHaveAttribute('id', 'flag-card-France');
  });

  it('sorts Z–A after clicking sort button', () => {
    mockUseCountries.mockReturnValue({
      countries: mockCountries,
      loading: false,
      error: null,
    });
    render(<FlagMosaic />);
    fireEvent.click(screen.getByRole('button', { name: /A – Z|Z – A/ }));
    const cards = screen
      .getAllByRole('button')
      .filter((btn) => btn.id.startsWith('flag-card-'));
    expect(cards[0]).toHaveAttribute('id', 'flag-card-Japan');
  });
});
