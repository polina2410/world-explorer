import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import CountriesTable from '@/components/features/CountriesTable/CountriesTable';
import type { CountryResponse } from '@/types/country';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const countries: CountryResponse[] = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', population: 67000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Japan', capital: 'Tokyo', flag: 'jp.svg', population: 125000000, continents: ['Asia'], mapUrl: '' },
  { name: 'Chad', capital: "N'Djamena", flag: 'td.svg', population: 17000000, continents: ['Africa'], mapUrl: '' },
];

describe('CountriesTable', () => {
  it('renders a row for each country', () => {
    render(<CountriesTable countries={countries} selectedLetter={null} />);
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('Chad')).toBeInTheDocument();
  });

  it('shows empty message when countries list is empty', () => {
    render(<CountriesTable countries={[]} selectedLetter={null} />);
    expect(screen.getByText(/No countries found/i)).toBeInTheDocument();
  });

  it('includes selected letter in empty message', () => {
    render(<CountriesTable countries={[]} selectedLetter="X" />);
    expect(screen.getByText(/starting with "X"/i)).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<CountriesTable countries={countries} selectedLetter={null} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Capital')).toBeInTheDocument();
    expect(screen.getByText(/Population/)).toBeInTheDocument();
    expect(screen.getByText('Regions')).toBeInTheDocument();
  });

  it('population column has aria-sort="none" initially', () => {
    render(<CountriesTable countries={countries} selectedLetter={null} />);
    const th = screen.getByRole('columnheader', { name: /Population/ });
    expect(th).toHaveAttribute('aria-sort', 'none');
  });

  it('clicking population header sorts ascending', () => {
    render(<CountriesTable countries={countries} selectedLetter={null} />);
    const th = screen.getByRole('columnheader', { name: /Population/ });
    fireEvent.click(th);
    expect(th).toHaveAttribute('aria-sort', 'ascending');

    const rows = screen.getAllByRole('row').slice(1); // skip header
    expect(within(rows[0]).getByText('Chad')).toBeInTheDocument();
    expect(within(rows[1]).getByText('France')).toBeInTheDocument();
    expect(within(rows[2]).getByText('Japan')).toBeInTheDocument();
  });

  it('clicking population header twice sorts descending', () => {
    render(<CountriesTable countries={countries} selectedLetter={null} />);
    const th = screen.getByRole('columnheader', { name: /Population/ });
    fireEvent.click(th);
    fireEvent.click(th);
    expect(th).toHaveAttribute('aria-sort', 'descending');

    const rows = screen.getAllByRole('row').slice(1);
    expect(within(rows[0]).getByText('Japan')).toBeInTheDocument();
    expect(within(rows[1]).getByText('France')).toBeInTheDocument();
    expect(within(rows[2]).getByText('Chad')).toBeInTheDocument();
  });

  it('clicking population header three times resets sort order', () => {
    render(<CountriesTable countries={countries} selectedLetter={null} />);
    const th = screen.getByRole('columnheader', { name: /Population/ });
    fireEvent.click(th);
    fireEvent.click(th);
    fireEvent.click(th);
    expect(th).toHaveAttribute('aria-sort', 'none');
  });

  it('Enter key on population header triggers sort', () => {
    render(<CountriesTable countries={countries} selectedLetter={null} />);
    const th = screen.getByRole('columnheader', { name: /Population/ });
    fireEvent.keyDown(th, { key: 'Enter' });
    expect(th).toHaveAttribute('aria-sort', 'ascending');
  });
});
