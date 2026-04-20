# Research: globe.gl — Can it be added to world-explorer?

**Verdict: Yes, it can — with caveats. Use `react-globe.gl` + `next/dynamic`, and treat it as an opt-in visual feature, not a core page component.**

---

## What it is

[globe.gl](https://github.com/vasturiano/globe.gl) is a WebGL-based interactive 3D globe built on top of Three.js. It supports 14+ data overlay layers: points, arcs, polygons, heatmaps, labels, HTML elements, and more.

For React projects, use the wrapper package: **`react-globe.gl`**

---

## Compatibility with this project

### SSR — requires `next/dynamic`
WebGL relies on browser APIs (`window`, `canvas`, `WebGLRenderingContext`) that don't exist on the server. You **must** lazy-load it:

```tsx
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });
```

This is already the project's pattern for heavy client components — no architectural change required.

### React 19 / Next.js 16
No documented incompatibilities. The `react-globe.gl` package uses standard React component patterns. Test after install.

### Existing data fit
The project already fetches country data from the REST Countries API (`src/lib/fetchCountries.ts`) including:
- Country name
- Flag SVG URL
- Continents
- Population

Globe.gl can render this data as **points** or **polygons** on the globe surface with minimal transformation. Country coordinates (lat/lng) are not currently fetched — you'd need to add `latlng` to the REST Countries API fields.

---

## Bundle size concern — the main risk

Three.js (globe.gl's core dependency) is large — approximately **600KB minified / ~160KB gzipped**. `react-globe.gl` adds on top of that.

**Mitigation:** Since it loads via `next/dynamic`, it only downloads when the component mounts — it won't bloat the initial page load. The `performance` agent should audit the impact after adding.

---

## Accessibility concern

WebGL canvas content is invisible to screen readers. If added, the globe must:
- Have a descriptive `aria-label` on its container
- Not be the **only** way to access country data (the `/countries` list page already fulfills this)
- Respect `prefers-reduced-motion` — disable auto-rotation if set

---

## Where it fits in the project

| Page | Fit | Notes |
|---|---|---|
| Home (`/`) | ✅ Good | Decorative globe showing all countries — visual hook |
| Countries (`/countries`) | ✅ Good | "Globe view" toggle alongside the existing list view |
| Quiz (`/quiz`) | ❌ No | Performance-critical page — don't add heavy WebGL here |

---

## Implementation sketch

```tsx
// src/components/features/GlobeView/GlobeView.tsx
'use client';
import dynamic from 'next/dynamic';
import type { CountryResponse } from '@/types/country';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type Props = { countries: CountryResponse[] };

export const GlobeView = ({ countries }: Props) => {
  const points = countries.map(c => ({
    lat: c.latlng?.[0] ?? 0,
    lng: c.latlng?.[1] ?? 0,
    label: c.name,
  }));

  return (
    <div aria-label="Interactive globe showing all countries">
      <Globe
        pointsData={points}
        pointLabel="label"
        pointColor={() => '#3b82f6'}
        pointAltitude={0.01}
        enablePointerInteraction={true}
      />
    </div>
  );
};
```

Note: `latlng` field needs to be added to the REST Countries API fetch in `src/lib/fetchCountries.ts`.

---

## Install

```bash
npm install react-globe.gl
```

---

## Recommendation

Add it as a **progressive enhancement** — a globe view on the home or countries page, lazy-loaded, with the existing list as the accessible fallback. Run the `performance` agent and `a11y` agent after adding to verify impact.
