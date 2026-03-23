import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import NotFound from '@/app/not-found';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('NotFound', () => {
  it('renders the 404 code', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<NotFound />);
    expect(
      screen.getByText('The page you are looking for does not exist or has been moved.')
    ).toBeInTheDocument();
  });

  it('renders a link to home', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: 'Go back home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});