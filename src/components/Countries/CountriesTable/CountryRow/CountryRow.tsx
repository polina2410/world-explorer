'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { CountryResponse } from '@/types/country';
import { formatList, formatPopulation } from '@/utils/utils';
import styles from './CountryRow.module.css';
import Tooltip from '@/components/Tooltip/Tooltip';
import { useCloseOnAnyClick } from '@/hooks/useCloseOnAnyClick';
import { createPortal } from 'react-dom';

type CountryRowProps = {
  country: CountryResponse;
  index: number;
};

export default function CountryRow({ country, index }: CountryRowProps) {
  const [zoomedFlag, setZoomedFlag] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useCloseOnAnyClick({ onCloseAction: () => setZoomedFlag(null) });

  return (
    <>
      <tr className={styles.countryRow}>
        <td className={styles.countryIndex}>{index + 1}</td>
        <td className={styles.countryName}>{country.name}</td>
        <td className={styles.countryCapital}>{country.capital ?? '—'}</td>

        <td className={styles.countryFlag}>
          {country.flag && (
            <div className={styles.countryFlag}>
              <Image
                src={country.flag}
                alt={`${country.name} flag`}
                height={16}
                width={0}
                className={styles.flagImage}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedFlag(country.flag);
                }}
              />
            </div>
          )}
        </td>

        <td className={styles.countryPopulation}>
          {formatPopulation(country.population ?? 0)}
        </td>

        <td className={styles.countryContinents}>
          {formatList(country.continents) ?? '—'}
        </td>

        <td className={styles.countryMap}>
          {country.mapUrl ? (
            <Tooltip content={`View ${country.name} on the map`}>
              <a
                href={country.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.truncated}
              >
                Link
              </a>
            </Tooltip>
          ) : (
            '—'
          )}
        </td>
      </tr>

      {zoomedFlag &&
        createPortal(
          <div
            ref={overlayRef}
            className={styles.flagOverlay}
            onClick={() => setZoomedFlag(null)}
          >
            <Image
              src={zoomedFlag}
              alt="Zoomed flag"
              width={0} // width will scale automatically
              height={0} // height auto
              style={{
                maxWidth: '90%',
                maxHeight: '80%',
                width: 'auto',
                height: 'auto',
              }}
              className={styles.flagZoomed}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </>
  );
}
