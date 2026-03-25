// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockPipeline, mockRedis } = vi.hoisted(() => {
  const mockPipeline = {
    incr: vi.fn().mockReturnThis(),
    expire: vi.fn().mockReturnThis(),
    exec: vi.fn(),
  };
  const mockRedis = {
    pipeline: vi.fn(() => mockPipeline),
    ttl: vi.fn(),
  };
  return { mockPipeline, mockRedis };
});

vi.mock('@/lib/redis', () => ({ redis: mockRedis }));

import { checkRateLimit } from '@/lib/rateLimit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.pipeline.mockReturnValue(mockPipeline);
  });

  it('allows request when under the limit', async () => {
    mockPipeline.exec.mockResolvedValue([1, 1]);

    const result = await checkRateLimit('127.0.0.1');

    expect(result).toEqual({ allowed: true, retryAfterSeconds: 0 });
  });

  it('allows request exactly at the limit', async () => {
    mockPipeline.exec.mockResolvedValue([2, 1]);

    const result = await checkRateLimit('127.0.0.1');

    expect(result).toEqual({ allowed: true, retryAfterSeconds: 0 });
  });

  it('blocks request when over the limit', async () => {
    mockPipeline.exec.mockResolvedValue([3, 1]);
    mockRedis.ttl.mockResolvedValue(42);

    const result = await checkRateLimit('127.0.0.1');

    expect(result).toEqual({ allowed: false, retryAfterSeconds: 42 });
  });

  it('falls back to WINDOW when ttl returns -1', async () => {
    mockPipeline.exec.mockResolvedValue([3, 1]);
    mockRedis.ttl.mockResolvedValue(-1);

    const result = await checkRateLimit('127.0.0.1');

    expect(result).toEqual({ allowed: false, retryAfterSeconds: 60 });
  });

  it('uses the correct redis key', async () => {
    mockPipeline.exec.mockResolvedValue([1, 1]);

    await checkRateLimit('192.168.1.1');

    expect(mockPipeline.incr).toHaveBeenCalledWith('rate_limit:192.168.1.1');
    expect(mockPipeline.expire).toHaveBeenCalledWith('rate_limit:192.168.1.1', 60);
  });

  it('does not call ttl when request is allowed', async () => {
    mockPipeline.exec.mockResolvedValue([1, 1]);

    await checkRateLimit('127.0.0.1');

    expect(mockRedis.ttl).not.toHaveBeenCalled();
  });
});