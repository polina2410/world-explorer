import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNavigationGuard } from '@/hooks/useNavigationGuard';
import { NavigationGuardProvider, useNavigationGuardContext } from '@/context/NavigationGuardContext';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) =>
  NavigationGuardProvider({ children });

describe('useNavigationGuard', () => {
  beforeEach(() => vi.clearAllMocks());

  it('registers guard in guardRef when active', () => {
    let guardRef: React.MutableRefObject<((proceed: () => void) => void) | null> | undefined;

    renderHook(
      ({ active }: { active: boolean }) => {
        const ctx = useNavigationGuardContext();
        guardRef = ctx.guardRef;
        useNavigationGuard(active, vi.fn());
      },
      { wrapper, initialProps: { active: true } }
    );

    expect(guardRef?.current).toBeTypeOf('function');
  });

  it('clears guardRef when not active', () => {
    let guardRef: React.MutableRefObject<((proceed: () => void) => void) | null> | undefined;

    const { rerender } = renderHook(
      ({ active }: { active: boolean }) => {
        const ctx = useNavigationGuardContext();
        guardRef = ctx.guardRef;
        useNavigationGuard(active, vi.fn());
      },
      { wrapper, initialProps: { active: true } }
    );

    rerender({ active: false });
    expect(guardRef?.current).toBeNull();
  });

  it('clears guardRef on unmount', () => {
    let guardRef: React.MutableRefObject<((proceed: () => void) => void) | null> | undefined;

    const { unmount } = renderHook(
      () => {
        const ctx = useNavigationGuardContext();
        guardRef = ctx.guardRef;
        useNavigationGuard(true, vi.fn());
      },
      { wrapper }
    );

    unmount();
    expect(guardRef?.current).toBeNull();
  });

  it('calls onBlock with proceed when guardRef is invoked', () => {
    const onBlock = vi.fn();
    let guardRef: React.MutableRefObject<((proceed: () => void) => void) | null> | undefined;

    renderHook(
      () => {
        const ctx = useNavigationGuardContext();
        guardRef = ctx.guardRef;
        useNavigationGuard(true, onBlock);
      },
      { wrapper }
    );

    const proceed = vi.fn();
    guardRef?.current?.(proceed);

    expect(onBlock).toHaveBeenCalledWith(proceed);
  });

  it('adds beforeunload listener when active', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useNavigationGuard(true, vi.fn()), { wrapper });
    expect(addSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });

  it('does not add beforeunload listener when inactive', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useNavigationGuard(false, vi.fn()), { wrapper });
    const beforeunloadCalls = addSpy.mock.calls.filter(([event]) => event === 'beforeunload');
    expect(beforeunloadCalls).toHaveLength(0);
  });

  it('removes beforeunload listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useNavigationGuard(true, vi.fn()), { wrapper });
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });
});
