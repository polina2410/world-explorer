import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CountriesContent from '@/components/features/CountriesPage/CountriesContent/CountriesContent';
import type { Country } from '@/utils/generateQuestions';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const countries: Country[] = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', continents: ['Europe'] },
  { name: 'Japan', capital: 'Tokyo', flag: 'jp.svg', continents: ['Asia'] },
  {
    name: 'Germany',
    capital: 'Berlin',
    flag: 'de.svg',
    continents: ['Europe'],
  },
];

describe('CountriesContent', () => {
  it('renders the page title', () => {
    render(
      <CountriesContent
        countries={countries}
        selectedLetter={null}
        setSelectedLetter={vi.fn()}
      />
    );
    expect(
      screen.getByText(/Alphabetical list of countries/i)
    ).toBeInTheDocument();
  });

  it('renders the alphabet filter', () => {
    render(
      <CountriesContent
        countries={countries}
        selectedLetter={null}
        setSelectedLetter={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Z' })).toBeInTheDocument();
  });

  it('renders the countries table', () => {
    render(
      <CountriesContent
        countries={countries}
        selectedLetter={null}
        setSelectedLetter={vi.fn()}
      />
    );
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('calls setSelectedLetter when a letter is clicked', () => {
    const setSelectedLetter = vi.fn();
    render(
      <CountriesContent
        countries={countries}
        selectedLetter={null}
        setSelectedLetter={setSelectedLetter}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    expect(setSelectedLetter).toHaveBeenCalledWith('F');
  });

  it('passes selectedLetter to the table (shows in empty message)', () => {
    render(
      <CountriesContent
        countries={[]}
        selectedLetter="X"
        setSelectedLetter={vi.fn()}
      />
    );
    expect(screen.getByText(/starting with "X"/i)).toBeInTheDocument();
  });
});
