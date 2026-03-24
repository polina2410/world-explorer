import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CountriesPageClient from '@/components/features/CountriesPage/CountriesPageClient';
import type { CountryResponse } from '@/types/country';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const countries: CountryResponse[] = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', continents: ['Europe'], population: 0, mapUrl: '' },
  { name: 'Japan', capital: 'Tokyo', flag: 'jp.svg', continents: ['Asia'], population: 0, mapUrl: '' },
  { name: 'Germany', capital: 'Berlin', flag: 'de.svg', continents: ['Europe'], population: 0, mapUrl: '' },
];

vi.mock('@/context/CountriesContext', () => ({
  useCountries: () => ({ countries, error: null }),
}));

describe('CountriesPageClient', () => {
  it('renders the page title', () => {
    render(<CountriesPageClient />);
    expect(screen.getByText(/Alphabetical list of countries/i)).toBeInTheDocument();
  });

  it('renders the alphabet filter', () => {
    render(<CountriesPageClient />);
    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Z' })).toBeInTheDocument();
  });

  it('renders the countries table', () => {
    render(<CountriesPageClient />);
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('filters countries when a letter is clicked', () => {
    render(<CountriesPageClient />);
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.queryByText('Japan')).not.toBeInTheDocument();
  });

  it('shows empty message when no countries match selected letter', () => {
    render(<CountriesPageClient />);
    fireEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(screen.getByText(/starting with "X"/i)).toBeInTheDocument();
  });
});
