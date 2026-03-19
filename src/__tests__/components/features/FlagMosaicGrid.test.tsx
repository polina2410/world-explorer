import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagMosaicGrid from '@/components/features/HomePage/FlagMosaicGrid/FlagMosaicGrid';
import { FlagMosaicProvider } from '@/context/FlagMosaicContext';
import { ReactNode } from 'react';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const countries = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', continents: ['Europe'] },
  { name: 'Japan', capital: 'Tokyo', flag: 'jp.svg', continents: ['Asia'] },
  {
    name: 'Brazil',
    capital: 'Brasília',
    flag: 'br.svg',
    continents: ['Americas'],
  },
];

const wrapper = ({ children }: { children: ReactNode }) => (
  <FlagMosaicProvider>{children}</FlagMosaicProvider>
);

describe('FlagMosaicGrid', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('renders a card for each country', () => {
    render(<FlagMosaicGrid countries={countries} />, { wrapper });
    expect(screen.getByAltText('France')).toBeInTheDocument();
    expect(screen.getByAltText('Japan')).toBeInTheDocument();
    expect(screen.getByAltText('Brazil')).toBeInTheDocument();
  });

  it('renders the grid container', () => {
    render(<FlagMosaicGrid countries={countries} />, { wrapper });
    expect(
      document.getElementById('flag-mosaic-container')
    ).toBeInTheDocument();
  });

  it('renders country names on card backs', () => {
    render(<FlagMosaicGrid countries={countries} />, { wrapper });
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('clicking a card flips it', () => {
    render(<FlagMosaicGrid countries={countries} />, { wrapper });
    const cards = screen.getAllByRole('button');
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveAttribute('aria-pressed', 'true');
  });

  it('Escape key closes a flipped card', () => {
    render(<FlagMosaicGrid countries={countries} />, { wrapper });
    const cards = screen.getAllByRole('button');
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveAttribute('aria-pressed', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(cards[0]).toHaveAttribute('aria-pressed', 'false');
  });
});
