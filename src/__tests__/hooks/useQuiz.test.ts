import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuiz } from '@/hooks/useQuiz';
import type { QuizQuestion } from '@/utils/generateQuestions';

const makeQuestions = (count: number): QuizQuestion[] =>
  Array.from({ length: count }, (_, i) => ({
    country: `Country${i + 1}`,
    question: `What is the capital of Country${i + 1}?`,
    correct: `Capital${i + 1}`,
    options: [`Capital${i + 1}`, 'Wrong1', 'Wrong2', 'Wrong3'],
  }));

describe('useQuiz', () => {
  it('starts at index 0', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(3)));
    expect(result.current.index).toBe(0);
  });

  it('starts with score 0', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(3)));
    expect(result.current.score).toBe(0);
  });

  it('returns first question as current', () => {
    const questions = makeQuestions(3);
    const { result } = renderHook(() => useQuiz(questions));
    expect(result.current.current).toBe(questions[0]);
  });

  it('total equals questions.length', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(5)));
    expect(result.current.total).toBe(5);
  });

  it('finished is false initially', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(3)));
    expect(result.current.finished).toBe(false);
  });

  it('answering correct increments score and index', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(3)));
    act(() => { result.current.answer(true); });
    expect(result.current.score).toBe(1);
    expect(result.current.index).toBe(1);
  });

  it('answering incorrect does not increment score but increments index', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(3)));
    act(() => { result.current.answer(false); });
    expect(result.current.score).toBe(0);
    expect(result.current.index).toBe(1);
  });

  it('finished becomes true after all questions answered', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(2)));
    act(() => { result.current.answer(true); });
    act(() => { result.current.answer(true); });
    expect(result.current.finished).toBe(true);
  });

  it('score accumulates across multiple correct answers', () => {
    const { result } = renderHook(() => useQuiz(makeQuestions(4)));
    act(() => { result.current.answer(true); });
    act(() => { result.current.answer(false); });
    act(() => { result.current.answer(true); });
    expect(result.current.score).toBe(2);
  });

  it('handles empty questions array', () => {
    const { result } = renderHook(() => useQuiz([]));
    expect(result.current.finished).toBe(true);
    expect(result.current.total).toBe(0);
    expect(result.current.current).toBeUndefined();
  });
});
