import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  NavigationGuardProvider,
  useNavigationGuardContext,
} from '@/context/NavigationGuardContext';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NavigationGuardProvider>{children}</NavigationGuardProvider>
);

describe('NavigationGuardContext', () => {
  it('guardRef starts as null', () => {
    const { result } = renderHook(() => useNavigationGuardContext(), { wrapper });
    expect(result.current.guardRef.current).toBeNull();
  });

  it('guardRef can be set and read', () => {
    const { result } = renderHook(() => useNavigationGuardContext(), { wrapper });
    const guard = vi.fn();

    act(() => { result.current.guardRef.current = guard; });
    expect(result.current.guardRef.current).toBe(guard);
  });

  it('guardRef can be cleared', () => {
    const { result } = renderHook(() => useNavigationGuardContext(), { wrapper });

    act(() => { result.current.guardRef.current = vi.fn(); });
    act(() => { result.current.guardRef.current = null; });
    expect(result.current.guardRef.current).toBeNull();
  });

  it('uses the default context (null guard) outside provider', () => {
    const { result } = renderHook(() => useNavigationGuardContext());
    expect(result.current.guardRef.current).toBeNull();
  });
});
