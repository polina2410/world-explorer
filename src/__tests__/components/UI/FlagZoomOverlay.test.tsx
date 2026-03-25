import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagZoomOverlay from '@/components/UI/FlagZoomOverlay/FlagZoomOverlay';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));
vi.mock('next/image', () => ({
  default: ({ src, alt, id }: { src: string; alt: string; id?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img id={id} src={src} alt={alt} />
  ),
}));

describe('FlagZoomOverlay', () => {
  it('renders the flag image with correct src', () => {
    render(<FlagZoomOverlay src="fr.svg" countryName="France" onClose={vi.fn()} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'fr.svg');
  });

  it('renders the flag image with correct alt text', () => {
    render(<FlagZoomOverlay src="jp.svg" countryName="Japan" onClose={vi.fn()} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Zoomed flag of Japan');
  });

  it('calls onClose when the overlay backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<FlagZoomOverlay src="de.svg" countryName="Germany" onClose={onClose} />);
    // Structure: overlay div > wrapper div > img
    const overlay = screen.getByRole('img').parentElement!.parentElement!;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the image wrapper is clicked', () => {
    const onClose = vi.fn();
    render(<FlagZoomOverlay src="de.svg" countryName="Germany" onClose={onClose} />);
    // Clicking the inner wrapper stops propagation — onClose should not fire
    const wrapper = screen.getByRole('img').parentElement!;
    fireEvent.click(wrapper);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders inside document.body (portal)', () => {
    render(<FlagZoomOverlay src="fr.svg" countryName="France" onClose={vi.fn()} />);
    const img = document.getElementById('flag-zoomed-image');
    expect(img).toBeTruthy();
    expect(document.body.contains(img)).toBe(true);
  });
});