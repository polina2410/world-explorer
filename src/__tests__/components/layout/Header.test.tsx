import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/layout/Header/Header';
import { ReactNode } from 'react';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const mockResetGame = vi.fn();
const mockToggleTheme = vi.fn();

vi.mock('@/context/GameContext', () => ({
  useGame: () => ({ resetGame: mockResetGame }),
}));

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: mockToggleTheme }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, onClick, className, 'aria-current': ariaCurrent }: {
    href: string; children: ReactNode; onClick?: (e: React.MouseEvent) => void;
    className?: string; 'aria-current'?: string;
  }) => (
    <a href={href} onClick={onClick} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  ),
}));

describe('Header', () => {
  it('renders the logo link', () => {
    render(<Header />);
    expect(screen.getByText('CountriesExplorer')).toBeInTheDocument();
  });

  it('renders Home, Quiz, Countries nav links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Quiz' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Countries' })).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
  });

  it('renders the hamburger menu button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument();
  });

  it('hamburger button has aria-expanded=false initially', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking hamburger sets aria-expanded=true', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking hamburger again closes the menu', () => {
    render(<Header />);
    const btn = screen.getByRole('button', { name: 'Toggle menu' });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking Quiz link calls resetGame', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('link', { name: 'Quiz' }));
    expect(mockResetGame).toHaveBeenCalledTimes(1);
  });

  it('clicking a nav link closes the menu', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
