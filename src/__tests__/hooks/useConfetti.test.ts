import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { SCORE_CONFETTI_MIN, SCORE_GOOD_MIN, SCORE_PERFECT } from '@/constants';

const mockConfetti = vi.fn();
vi.mock('canvas-confetti', () => ({ default: (...args: unknown[]) => mockConfetti(...args) }));

import { useConfetti } from '@/hooks/useConfetti';

beforeEach(() => {
  mockConfetti.mockClear();
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date'] });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useConfetti', () => {
  it('does not fire confetti when score is below SCORE_CONFETTI_MIN', () => {
    renderHook(() => useConfetti(SCORE_CONFETTI_MIN - 1));
    vi.advanceTimersByTime(4000);
    expect(mockConfetti).not.toHaveBeenCalled();
  });

  it('fires confetti when score equals SCORE_CONFETTI_MIN', () => {
    renderHook(() => useConfetti(SCORE_CONFETTI_MIN, 1000));
    vi.advanceTimersByTime(500);
    expect(mockConfetti).toHaveBeenCalled();
  });

  it('uses base particle count (60) for score between SCORE_CONFETTI_MIN and SCORE_GOOD_MIN', () => {
    renderHook(() => useConfetti(SCORE_CONFETTI_MIN, 1000));
    vi.advanceTimersByTime(400);
    expect(mockConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ particleCount: 60, spread: 70 })
    );
  });

  it('uses higher particle count (120) for score >= SCORE_GOOD_MIN', () => {
    renderHook(() => useConfetti(SCORE_GOOD_MIN, 1000));
    vi.advanceTimersByTime(400);
    expect(mockConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ particleCount: 120, spread: 90 })
    );
  });

  it('uses max particle count (200) for perfect score', () => {
    renderHook(() => useConfetti(SCORE_PERFECT, 1000));
    vi.advanceTimersByTime(400);
    expect(mockConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ particleCount: 200, spread: 120 })
    );
  });

  it('fires a final burst of 400 particles when perfect score duration ends', () => {
    renderHook(() => useConfetti(SCORE_PERFECT, 1000));
    vi.advanceTimersByTime(1500);
    const calls = mockConfetti.mock.calls.map((c) => c[0] as { particleCount: number });
    const hasFinalBurst = calls.some((c) => c.particleCount === 400);
    expect(hasFinalBurst).toBe(true);
  });

  it('does NOT fire final burst for non-perfect score', () => {
    renderHook(() => useConfetti(SCORE_GOOD_MIN, 500));
    vi.advanceTimersByTime(1000);
    const calls = mockConfetti.mock.calls.map((c) => c[0] as { particleCount: number });
    const hasFinalBurst = calls.some((c) => c.particleCount === 400);
    expect(hasFinalBurst).toBe(false);
  });

  it('stops firing confetti after unmount', () => {
    const { unmount } = renderHook(() => useConfetti(SCORE_CONFETTI_MIN, 2000));
    vi.advanceTimersByTime(400);
    const callsBeforeUnmount = mockConfetti.mock.calls.length;
    unmount();
    vi.advanceTimersByTime(2000);
    expect(mockConfetti.mock.calls.length).toBe(callsBeforeUnmount);
  });
});