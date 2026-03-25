import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/layout/Footer/Footer';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));
vi.mock('@/components/UI/FeedbackModal/FeedbackModal', () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? <div role="dialog" aria-label="feedback modal"><button onClick={onClose}>Close</button></div> : null,
}));

describe('Footer', () => {
  it('renders the author name', () => {
    render(<Footer />);
    expect(screen.getByText('Polina Smekhova')).toBeInTheDocument();
  });

  it('renders GitHub, LinkedIn, and Telegram links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Telegram' })).toBeInTheDocument();
  });

  it('external links have target="_blank" and rel="noopener noreferrer"', () => {
    render(<Footer />);
    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the Feedback button', () => {
    render(<Footer />);
    expect(screen.getByRole('button', { name: /send feedback/i })).toBeInTheDocument();
  });

  it('feedback modal is not visible by default', () => {
    render(<Footer />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clicking Feedback button opens the feedback modal', () => {
    render(<Footer />);
    fireEvent.click(screen.getByRole('button', { name: /send feedback/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('feedback modal closes when onClose is called', () => {
    render(<Footer />);
    fireEvent.click(screen.getByRole('button', { name: /send feedback/i }));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});