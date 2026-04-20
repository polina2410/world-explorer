'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeMethods } from 'react-globe.gl';
import { CountryResponse } from '@/types/country';
import {
  GLOBE_HEIGHT_PX,
  CONTINENT_COLORS,
  DEFAULT_POINT_COLOR,
  GLOBE_POINT_ALTITUDE,
  GLOBE_POINT_RADIUS,
  GLOBE_BG_COLOR,
  GLOBE_IMAGE_URL,
} from '@/constants';
import { CountryCard } from './CountryCard/CountryCard';
import { ContinentLegend } from './ContinentLegend/ContinentLegend';
import styles from './GlobeView.module.css';

// Loaded client-side only — react-globe.gl uses ThreeJS/WebGL
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => <div className={styles.skeleton} aria-hidden="true" />,
});

type GlobePoint = {
  lat: number;
  lng: number;
  label: string;
  country: CountryResponse;
};

type Props = {
  countries: CountryResponse[];
};

const toGlobePoints = (countries: CountryResponse[]): GlobePoint[] =>
  countries.flatMap((c) => {
    if (!c.latlng) return [];
    return [{ lat: c.latlng[0], lng: c.latlng[1], label: c.name, country: c }];
  });

const getPointColor = (point: object): string => {
  const p = point as GlobePoint;
  const continent = p.country.continents[0];
  if (!continent) return DEFAULT_POINT_COLOR;
  return CONTINENT_COLORS[continent] ?? DEFAULT_POINT_COLOR;
};

export const GlobeView = ({ countries }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods>(undefined);
  const [width, setWidth] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<CountryResponse | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    setWidth(containerRef.current.offsetWidth);

    return () => observer.disconnect();
  }, []);

  const handleGlobeReady = () => {
    const controls = globeRef.current?.controls();
    if (controls) {
      controls.autoRotate = false;
    }
  };

  const handlePointClick = (point: object) => {
    const p = point as GlobePoint;
    setSelectedCountry(p.country);
  };

  const handleClose = () => {
    setSelectedCountry(null);
  };

  const handleBackdropClick = () => {
    if (selectedCountry) {
      setSelectedCountry(null);
    }
  };

  const points = toGlobePoints(countries);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      aria-label="Interactive globe showing all countries"
      role="img"
      onClick={handleBackdropClick}
    >
      {width > 0 && (
        <Globe
          ref={globeRef}
          width={width}
          height={GLOBE_HEIGHT_PX}
          globeImageUrl={GLOBE_IMAGE_URL}
          backgroundColor={GLOBE_BG_COLOR}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointLabel="label"
          pointColor={getPointColor}
          pointAltitude={GLOBE_POINT_ALTITUDE}
          pointRadius={GLOBE_POINT_RADIUS}
          atmosphereColor="lightskyblue"
          atmosphereAltitude={0.15}
          enablePointerInteraction={true}
          onGlobeReady={handleGlobeReady}
          onPointClick={handlePointClick}
        />
      )}

      {selectedCountry && (
        <div onClick={(e) => e.stopPropagation()}>
          <CountryCard country={selectedCountry} onClose={handleClose} />
        </div>
      )}

      <ContinentLegend />

      {!selectedCountry && (
        <p className={styles.hint} aria-live="polite">
          Click a dot to see country details
        </p>
      )}
    </div>
  );
};
