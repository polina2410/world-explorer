import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/layout/Header/ThemeToggle/ThemeToggle';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

describe('ThemeToggle', () => {
  it('renders the toggle button', () => {
    render(<ThemeToggle theme="light" toggleTheme={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
  });

  it('shows MoonIcon when theme is light', () => {
    render(<ThemeToggle theme="light" toggleTheme={vi.fn()} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('shows SunIcon when theme is dark', () => {
    render(<ThemeToggle theme="dark" toggleTheme={vi.fn()} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    const toggleTheme = vi.fn();
    render(<ThemeToggle theme="light" toggleTheme={toggleTheme} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('calls optional onClick when clicked', () => {
    const onClick = vi.fn();
    render(<ThemeToggle theme="light" toggleTheme={vi.fn()} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw when onClick is not provided', () => {
    const toggleTheme = vi.fn();
    render(<ThemeToggle theme="light" toggleTheme={toggleTheme} />);
    expect(() => fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))).not.toThrow();
  });
});
