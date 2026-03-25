import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

type ContinentKey =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';

const CONTINENTS: Record<
  ContinentKey,
  { path: string; viewBox: string; color: string; accent: string }
> = {
  Africa: {
    viewBox: '0 0 210 250',
    color: '#F59E0B',
    accent: '#FCD34D',
    path: 'M 70,20 L 130,15 L 155,30 L 165,55 L 160,80 L 170,105 L 175,140 L 165,175 L 150,200 L 130,220 L 100,225 L 80,215 L 65,190 L 55,165 L 50,135 L 45,105 L 40,80 L 45,55 L 55,30 Z',
  },
  Asia: {
    viewBox: '0 0 320 220',
    color: '#10B981',
    accent: '#6EE7B7',
    path: 'M 30,60 L 80,30 L 140,10 L 210,15 L 270,30 L 305,55 L 295,90 L 270,110 L 285,145 L 265,175 L 230,185 L 195,175 L 175,190 L 150,185 L 135,195 L 115,180 L 90,190 L 70,170 L 45,135 L 20,100 L 15,75 Z',
  },
  Europe: {
    viewBox: '0 0 200 200',
    color: '#3B82F6',
    accent: '#93C5FD',
    path: 'M 85,15 L 120,10 L 155,25 L 165,55 L 150,80 L 160,105 L 145,130 L 120,140 L 90,135 L 65,128 L 50,108 L 55,82 L 40,65 L 48,40 L 65,25 Z',
  },
  'North America': {
    viewBox: '0 0 260 290',
    color: '#EF4444',
    accent: '#FCA5A5',
    path: 'M 60,20 L 140,10 L 200,20 L 230,48 L 235,78 L 218,105 L 215,135 L 195,165 L 183,195 L 163,220 L 143,228 L 123,218 L 108,198 L 88,172 L 62,148 L 38,112 L 25,78 L 35,48 Z',
  },
  Oceania: {
    viewBox: '0 0 240 190',
    color: '#EC4899',
    accent: '#F9A8D4',
    path: 'M 38,58 L 88,35 L 148,32 L 198,48 L 215,75 L 210,112 L 190,138 L 158,148 L 125,143 L 92,133 L 60,118 L 38,92 Z',
  },
  'South America': {
    viewBox: '0 0 190 270',
    color: '#8B5CF6',
    accent: '#C4B5FD',
    path: 'M 78,18 L 128,13 L 163,33 L 173,63 L 168,93 L 158,123 L 153,158 L 143,193 L 128,223 L 108,243 L 88,238 L 73,218 L 63,188 L 56,158 L 53,128 L 60,98 L 63,68 L 68,43 Z',
  },
};

export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get('continent') ?? '';
  const continent: ContinentKey =
    param in CONTINENTS ? (param as ContinentKey) : 'Africa';

  const { path, viewBox, color, accent } = CONTINENTS[continent];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          background: '#0f172a',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 0,
          }}
        >
          <span
            style={{
              color: accent,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Countries Explorer
          </span>
          <span
            style={{
              color: '#f1f5f9',
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            {continent}
          </span>
          <span
            style={{
              color: '#94a3b8',
              fontSize: 28,
            }}
          >
            Explore countries of {continent}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 430,
            height: 430,
          }}
        >
          <svg viewBox={viewBox} width={400} height={400}>
            <path d={path} fill={color} opacity={0.9} />
          </svg>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}