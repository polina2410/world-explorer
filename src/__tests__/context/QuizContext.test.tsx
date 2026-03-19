import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QuizProvider, useQuiz } from '@/context/QuizContext';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <QuizProvider>{children}</QuizProvider>
);

describe('QuizContext', () => {
  it('starts with phase "start"', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    expect(result.current.phase).toBe('start');
  });

  it('starts with null selectedContinent', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    expect(result.current.selectedContinent).toBeNull();
  });

  it('starts with null questionCount', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    expect(result.current.questionCount).toBeNull();
  });

  it('setPhase updates the phase', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    act(() => { result.current.setPhase('quiz'); });
    expect(result.current.phase).toBe('quiz');
  });

  it('setSelectedContinent updates the continent', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    act(() => { result.current.setSelectedContinent('Europe'); });
    expect(result.current.selectedContinent).toBe('Europe');
  });

  it('setQuestionCount updates the count', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    act(() => { result.current.setQuestionCount(10); });
    expect(result.current.questionCount).toBe(10);
  });

  it('resetGame resets all state', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    act(() => {
      result.current.setPhase('quiz');
      result.current.setSelectedContinent('Asia');
      result.current.setQuestionCount(5);
    });
    act(() => { result.current.resetGame(); });
    expect(result.current.phase).toBe('start');
    expect(result.current.selectedContinent).toBeNull();
    expect(result.current.questionCount).toBeNull();
  });

  it('throws when used outside QuizProvider', () => {
    expect(() => {
      renderHook(() => useQuiz());
    }).toThrow('useQuiz must be used within a QuizProvider');
  });
});
