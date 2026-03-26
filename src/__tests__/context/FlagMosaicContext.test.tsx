import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FlagMosaicProvider, useFlagMosaic } from '@/context/FlagMosaicContext';
import { ReactNode } from 'react';
import { FLAG_CARD_AUTO_CLOSE_MS } from '@/constants';

const wrapper = ({ children }: { children: ReactNode }) => (
  <FlagMosaicProvider>{children}</FlagMosaicProvider>
);

describe('FlagMosaicContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with flipped null', () => {
    const { result } = renderHook(() => useFlagMosaic(), { wrapper });
    expect(result.current.state.flipped).toBeNull();
  });

  it('flip sets the flipped name', () => {
    const { result } = renderHook(() => useFlagMosaic(), { wrapper });
    act(() => { result.current.flip('France'); });
    expect(result.current.state.flipped).toBe('France');
  });

  it('flip called twice with the same name keeps it flipped (toggle is card responsibility)', () => {
    const { result } = renderHook(() => useFlagMosaic(), { wrapper });
    act(() => { result.current.flip('France'); });
    act(() => { result.current.flip('France'); });
    expect(result.current.state.flipped).toBe('France');
  });

  it('flip on a different card switches to the new card', () => {
    const { result } = renderHook(() => useFlagMosaic(), { wrapper });
    act(() => { result.current.flip('France'); });
    act(() => { result.current.flip('Japan'); });
    expect(result.current.state.flipped).toBe('Japan');
  });

  it('close sets flipped to null', () => {
    const { result } = renderHook(() => useFlagMosaic(), { wrapper });
    act(() => { result.current.flip('France'); });
    act(() => { result.current.close(); });
    expect(result.current.state.flipped).toBeNull();
  });

  it('auto-closes after FLAG_CARD_AUTO_CLOSE_MS', () => {
    const { result } = renderHook(() => useFlagMosaic(), { wrapper });
    act(() => { result.current.flip('France'); });
    expect(result.current.state.flipped).toBe('France');

    act(() => { vi.advanceTimersByTime(FLAG_CARD_AUTO_CLOSE_MS); });
    expect(result.current.state.flipped).toBeNull();
  });

  it('manual close before timeout cancels auto-close', () => {
    const { result } = renderHook(() => useFlagMosaic(), { wrapper });
    act(() => { result.current.flip('France'); });
    act(() => { result.current.close(); });

    act(() => { vi.advanceTimersByTime(FLAG_CARD_AUTO_CLOSE_MS); });
    expect(result.current.state.flipped).toBeNull();
  });

  it('throws when used outside FlagMosaicProvider', () => {
    expect(() => {
      renderHook(() => useFlagMosaic());
    }).toThrow('useFlagMosaic must be used inside FlagMosaicProvider');
  });
});
