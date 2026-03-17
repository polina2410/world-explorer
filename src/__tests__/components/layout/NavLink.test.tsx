import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavLink } from '@/components/layout/NavLink/NavLink';
import { NavigationGuardProvider, useNavigationGuardContext } from '@/context/NavigationGuardContext';
import { ReactNode, useEffect } from 'react';

const mockPush = vi.fn();
const mockPathname = vi.fn(() => '/');

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, onClick, className, 'aria-current': ariaCurrent }: {
    href: string;
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    'aria-current'?: string;
  }) => (
    <a href={href} onClick={onClick} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  ),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationGuardProvider>{children}</NavigationGuardProvider>
);

describe('NavLink', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockPathname.mockReturnValue('/');
  });

  it('renders the link with correct href', () => {
    render(<NavLink href="/">Home</NavLink>, { wrapper });
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('renders children', () => {
    render(<NavLink href="/game">Play</NavLink>, { wrapper });
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('sets aria-current="page" when path matches href', () => {
    mockPathname.mockReturnValue('/game');
    render(<NavLink href="/game">Game</NavLink>, { wrapper });
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when path does not match', () => {
    mockPathname.mockReturnValue('/');
    render(<NavLink href="/game">Game</NavLink>, { wrapper });
    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });

  it('calls onClick prop on normal click (no guard)', () => {
    const onClick = vi.fn();
    render(<NavLink href="/game" onClick={onClick}>Game</NavLink>, { wrapper });
    fireEvent.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('intercepts click and calls guard when guard is active', () => {
    const guard = vi.fn();

    const SetGuard = ({ fn }: { fn: (proceed: () => void) => void }) => {
      const { guardRef } = useNavigationGuardContext();
      useEffect(() => { guardRef.current = fn; }, [fn, guardRef]);
      return null;
    };

    render(
      <NavigationGuardProvider>
        <SetGuard fn={guard} />
        <NavLink href="/game">Game</NavLink>
      </NavigationGuardProvider>
    );

    fireEvent.click(screen.getByRole('link'));
    expect(guard).toHaveBeenCalledTimes(1);
  });

  it('guard receives a proceed function that calls router.push', () => {
    let capturedProceed: (() => void) | null = null;

    const SetGuard = () => {
      const { guardRef } = useNavigationGuardContext();
      useEffect(() => {
        guardRef.current = (proceed: () => void) => { capturedProceed = proceed; };
      }, [guardRef]);
      return null;
    };

    render(
      <NavigationGuardProvider>
        <SetGuard />
        <NavLink href="/game">Game</NavLink>
      </NavigationGuardProvider>
    );

    fireEvent.click(screen.getByRole('link'));
    expect(capturedProceed).not.toBeNull();
    capturedProceed!();
    expect(mockPush).toHaveBeenCalledWith('/game');
  });
});
