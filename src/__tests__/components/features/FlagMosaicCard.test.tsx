import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagMosaicCard from '@/components/features/HomePage/FlagMosaicCard/FlagMosaicCard';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const country = { name: 'France', flag: 'fr.svg' };

const defaultProps = {
  country,
  index: 0,
  isFlipped: false,
  isDimmed: false,
  flip: vi.fn(),
  close: vi.fn(),
};

describe('FlagMosaicCard', () => {
  it('renders the flag image', () => {
    render(<FlagMosaicCard {...defaultProps} />);
    expect(screen.getByAltText('France')).toBeInTheDocument();
  });

  it('shows country name on the back face', () => {
    render(<FlagMosaicCard {...defaultProps} />);
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('has role="button"', () => {
    render(<FlagMosaicCard {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('aria-pressed is false when isFlipped=false', () => {
    render(<FlagMosaicCard {...defaultProps} isFlipped={false} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('aria-pressed is true when isFlipped=true', () => {
    render(<FlagMosaicCard {...defaultProps} isFlipped={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('clicking an unflipped card calls flip with country name', () => {
    const flip = vi.fn();
    render(<FlagMosaicCard {...defaultProps} isFlipped={false} flip={flip} />);
    fireEvent.click(screen.getByRole('button'));
    expect(flip).toHaveBeenCalledWith('France');
  });

  it('clicking a flipped card calls close', () => {
    const close = vi.fn();
    render(<FlagMosaicCard {...defaultProps} isFlipped={true} close={close} />);
    fireEvent.click(screen.getByRole('button'));
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('Enter key calls flip when not flipped', () => {
    const flip = vi.fn();
    render(<FlagMosaicCard {...defaultProps} isFlipped={false} flip={flip} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(flip).toHaveBeenCalledWith('France');
  });

  it('Space key calls flip when not flipped', () => {
    const flip = vi.fn();
    render(<FlagMosaicCard {...defaultProps} isFlipped={false} flip={flip} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(flip).toHaveBeenCalledWith('France');
  });

  it('other keys do not call flip or close', () => {
    const flip = vi.fn();
    const close = vi.fn();
    render(<FlagMosaicCard {...defaultProps} flip={flip} close={close} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });
    expect(flip).not.toHaveBeenCalled();
    expect(close).not.toHaveBeenCalled();
  });
});