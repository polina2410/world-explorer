import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryRow from '@/components/features/CountriesPage/CountryRow/CountryRow';
import type { CountryResponse } from '@/types/country';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    onClick,
    id,
  }: {
    src: string;
    alt: string;
    onClick?: () => void;
    id?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onClick={onClick} id={id} />
  ),
}));

// FlagZoomOverlay uses createPortal — render into body which jsdom supports fine
vi.mock('@/components/UI/FlagZoomOverlay/FlagZoomOverlay', () => ({
  default: ({
    countryName,
    onClose,
  }: {
    src: string;
    countryName: string;
    onClose: () => void;
  }) => (
    <div role="dialog" aria-label={`Zoomed flag of ${countryName}`}>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const france: CountryResponse = {
  name: 'France',
  capital: 'Paris',
  flag: 'fr.svg',
  population: 67000000,
  continents: ['Europe'],
  mapUrl: 'https://maps.google.com/?q=France',
};

const renderRow = (country = france, index = 0) =>
  render(
    <table>
      <tbody>
        <CountryRow country={country} index={index} />
      </tbody>
    </table>
  );

describe('CountryRow', () => {
  it('renders country name', () => {
    renderRow();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('renders capital', () => {
    renderRow();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('renders formatted population', () => {
    renderRow();
    expect(screen.getByText('67,000,000')).toBeInTheDocument();
  });

  it('renders continent', () => {
    renderRow();
    expect(screen.getByText('Europe')).toBeInTheDocument();
  });

  it('renders 1-based index', () => {
    renderRow(france, 2);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders the flag image', () => {
    renderRow();
    expect(screen.getByAltText('France flag')).toBeInTheDocument();
  });

  it('renders map link when mapUrl is present', () => {
    renderRow();
    expect(screen.getByRole('link', { name: 'View on map' })).toHaveAttribute(
      'href',
      'https://maps.google.com/?q=France'
    );
  });

  it('renders em dash when mapUrl is absent', () => {
    renderRow({ ...france, mapUrl: '' });
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders em dash when capital is absent', () => {
    renderRow({ ...france, capital: undefined });
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('clicking the flag image opens the zoom overlay', () => {
    renderRow();
    fireEvent.click(screen.getByAltText('France flag'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closing the overlay hides it', () => {
    renderRow();
    fireEvent.click(screen.getByAltText('France flag'));
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Escape key closes the overlay', () => {
    renderRow();
    fireEvent.click(screen.getByAltText('France flag'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
