// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/countries/route';

const mockRawCountries = [
  {
    name: { common: 'France' },
    capital: ['Paris'],
    flags: { svg: 'fr.svg' },
    population: 67000000,
    continents: ['Europe'],
    maps: { googleMaps: 'https://maps.google.com/?q=France' },
    independent: true,
  },
  {
    name: { common: 'Japan' },
    capital: ['Tokyo'],
    flags: { svg: 'jp.svg' },
    population: 125000000,
    continents: ['Asia'],
    maps: { googleMaps: 'https://maps.google.com/?q=Japan' },
    independent: true,
  },
  {
    name: { common: 'Kosovo' },
    capital: ['Pristina'],
    flags: { svg: 'xk.svg' },
    population: 1800000,
    continents: ['Europe'],
    maps: {},
    independent: false,
  },
];

describe('GET /api/countries', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns transformed countries on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRawCountries,
      })
    );

    const res = await GET();
    const data = await res.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2); // Kosovo (independent: false) excluded
    expect(data[0]).toMatchObject({ name: 'France', capital: 'Paris', flag: 'fr.svg' });
    expect(data[1]).toMatchObject({ name: 'Japan', capital: 'Tokyo', flag: 'jp.svg' });
  });

  it('excludes non-independent countries', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRawCountries,
      })
    );

    const res = await GET();
    const data = await res.json();

    const names = data.map((c: { name: string }) => c.name);
    expect(names).not.toContain('Kosovo');
  });

  it('returns 500 when upstream fetch returns non-ok status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 503 })
    );

    const res = await GET();
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/503/);
  });

  it('returns 500 when fetch throws', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error'))
    );

    const res = await GET();
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('includes population and continents in the response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRawCountries,
      })
    );

    const res = await GET();
    const data = await res.json();

    expect(data[0].population).toBe(67000000);
    expect(data[0].continents).toEqual(['Europe']);
  });
});
