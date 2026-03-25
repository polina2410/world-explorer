// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextRequest } from 'next/server';

const mockImageResponse = vi.fn();
vi.mock('next/og', () => ({
  ImageResponse: class {
    constructor(...args: unknown[]) {
      mockImageResponse(...args);
    }
  },
}));

import { GET } from '@/app/api/og/route';

const makeRequest = (continent?: string) =>
  ({
    nextUrl: {
      searchParams: new URLSearchParams(continent ? `continent=${continent}` : ''),
    },
  }) as unknown as NextRequest;

beforeEach(() => {
  mockImageResponse.mockClear();
});

describe('GET /api/og', () => {
  it('returns an ImageResponse with 1200x630 dimensions', async () => {
    await GET(makeRequest('Europe'));
    const [, options] = mockImageResponse.mock.calls[0];
    expect(options).toEqual({ width: 1200, height: 630 });
  });

  it('falls back to Africa when no continent param is provided', async () => {
    await GET(makeRequest());
    const [jsx] = mockImageResponse.mock.calls[0];
    expect(JSON.stringify(jsx)).toContain('Africa');
  });

  it('falls back to Africa when an unknown continent is provided', async () => {
    await GET(makeRequest('Antarctica'));
    const [jsx] = mockImageResponse.mock.calls[0];
    expect(JSON.stringify(jsx)).toContain('Africa');
  });

  it.each(['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'])(
    'renders the continent name "%s" in the image',
    async (continent) => {
      await GET(makeRequest(continent));
      const [jsx] = mockImageResponse.mock.calls[0];
      expect(JSON.stringify(jsx)).toContain(continent);
    }
  );

  it('uses the correct color for Europe (#3B82F6)', async () => {
    await GET(makeRequest('Europe'));
    const [jsx] = mockImageResponse.mock.calls[0];
    expect(JSON.stringify(jsx)).toContain('#3B82F6');
  });

  it('uses the correct color for Africa (#F59E0B)', async () => {
    await GET(makeRequest('Africa'));
    const [jsx] = mockImageResponse.mock.calls[0];
    expect(JSON.stringify(jsx)).toContain('#F59E0B');
  });
});