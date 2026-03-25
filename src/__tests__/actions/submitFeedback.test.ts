// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockHeaders, mockCheckRateLimit, mockInsert } = vi.hoisted(() => {
  const mockInsert = vi.fn();
  const mockFrom = vi.fn(() => ({ insert: mockInsert }));
  const mockHeadersGet = vi.fn();
  return {
    mockHeaders: vi.fn(() => ({ get: mockHeadersGet })),
    mockCheckRateLimit: vi.fn(),
    mockInsert,
    mockFrom,
    mockHeadersGet,
  };
});

vi.mock('next/headers', () => ({ headers: mockHeaders }));
vi.mock('@/lib/supabase', () => ({
  supabase: { from: vi.fn(() => ({ insert: mockInsert })) },
}));
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: mockCheckRateLimit }));

import { submitFeedback } from '@/actions/submitFeedback';

const validInput = { name: 'Alice', email: 'alice@example.com', message: 'Great app!' };

beforeEach(() => {
  vi.clearAllMocks();
  mockHeaders.mockReturnValue({ get: (h: string) => (h === 'x-forwarded-for' ? '1.2.3.4' : null) });
  mockCheckRateLimit.mockResolvedValue({ allowed: true, retryAfterSeconds: 0 });
  mockInsert.mockResolvedValue({ error: null });
});

describe('submitFeedback', () => {
  it('returns success when input is valid', async () => {
    const result = await submitFeedback(validInput);
    expect(result).toEqual({ success: true });
  });

  it('returns rate limit error when not allowed', async () => {
    mockCheckRateLimit.mockResolvedValue({ allowed: false, retryAfterSeconds: 45 });
    const result = await submitFeedback(validInput);
    expect(result).toEqual({ success: false, error: 'Too many requests. Please try again in 45s.' });
  });

  it('returns error when email is empty', async () => {
    const result = await submitFeedback({ ...validInput, email: '   ' });
    expect(result).toEqual({ success: false, error: 'Email is required.' });
  });

  it('returns error when email is invalid', async () => {
    const result = await submitFeedback({ ...validInput, email: 'not-an-email' });
    expect(result).toEqual({ success: false, error: 'Please enter a valid email address.' });
  });

  it('returns error when message is empty', async () => {
    const result = await submitFeedback({ ...validInput, message: '   ' });
    expect(result).toEqual({ success: false, error: 'Message is required.' });
  });

  it('returns supabase error message when insert fails', async () => {
    mockInsert.mockResolvedValue({ error: { message: 'DB connection failed' } });
    const result = await submitFeedback(validInput);
    expect(result).toEqual({ success: false, error: 'DB connection failed' });
  });

  it('uses x-forwarded-for header for the IP', async () => {
    mockHeaders.mockReturnValue({ get: (h: string) => (h === 'x-forwarded-for' ? '10.0.0.1, 10.0.0.2' : null) });
    await submitFeedback(validInput);
    expect(mockCheckRateLimit).toHaveBeenCalledWith('10.0.0.1');
  });

  it('falls back to x-real-ip when x-forwarded-for is absent', async () => {
    mockHeaders.mockReturnValue({
      get: (h: string) => (h === 'x-real-ip' ? '5.5.5.5' : null),
    });
    await submitFeedback(validInput);
    expect(mockCheckRateLimit).toHaveBeenCalledWith('5.5.5.5');
  });

  it('falls back to "unknown" when no IP headers present', async () => {
    mockHeaders.mockReturnValue({ get: () => null });
    await submitFeedback(validInput);
    expect(mockCheckRateLimit).toHaveBeenCalledWith('unknown');
  });

  it('trims whitespace from email and message before insert', async () => {
    const { supabase } = await import('@/lib/supabase');
    await submitFeedback({ name: ' Bob ', email: ' bob@example.com ', message: ' hello ' });
    expect(supabase.from('feedback').insert).toHaveBeenCalledWith({
      name: 'Bob',
      email: 'bob@example.com',
      message: 'hello',
    });
  });

  it('stores null for name when name is empty', async () => {
    const { supabase } = await import('@/lib/supabase');
    await submitFeedback({ name: '', email: 'x@x.com', message: 'hi' });
    expect(supabase.from('feedback').insert).toHaveBeenCalledWith(
      expect.objectContaining({ name: null })
    );
  });
});