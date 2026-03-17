import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagMosaicCard from '@/components/features/FlagMosaic/FlagMosaicCard/FlagMosaicCard';
import { FlagMosaicProvider } from '@/context/FlagMosaicContext';
import { ReactNode } from 'react';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <FlagMosaicProvider>{children}</FlagMosaicProvider>
);

const country = { name: 'France', flag: 'fr.svg' };

describe('FlagMosaicCard', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('renders the flag image', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    expect(screen.getByAltText('France')).toBeInTheDocument();
  });

  it('shows country name on the back face', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('has role="button"', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('aria-pressed is false initially', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking the card flips it (aria-pressed becomes true)', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('clicking a flipped card closes it (aria-pressed becomes false)', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('Enter key flips the card', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('Space key flips the card', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('other keys do not flip the card', () => {
    render(<FlagMosaicCard country={country} index={0} />, { wrapper });
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });
});
