'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { CountryResponse } from '@/types/country';
import { formatList, formatPopulation } from '@/utils/utils';
import styles from './CountryRow.module.css';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { useCloseOnAnyClick } from '@/hooks/useCloseOnAnyClick';
import { motion } from 'motion/react';
import { rowVariants } from '@/animations/animations';

type CountryRowProps = {
  country: CountryResponse;
  index: number;
};

export default function CountryRow({ country, index }: CountryRowProps) {
  const [zoomedFlag, setZoomedFlag] = useState<string | null>(null);

  useCloseOnAnyClick({ onCloseAction: () => setZoomedFlag(null) });

  const countryId = country.name.toLowerCase().replace(/\s/g, '-');

  return (
    <>
      <motion.tr
        id={`country-row-${countryId}`}
        className={styles.countryRow}
        variants={rowVariants}
        layout
      >
        <td className={styles.countryIndex}>{index + 1}</td>
        <td className={styles.countryName}>{country.name}</td>
        <td>{country.capital ?? '—'}</td>

        <td>
          {country.flag && (
            <Image
              id={`flag-${countryId}`}
              src={country.flag}
              alt={`${country.name} flag`}
              width={24}
              height={16}
              style={{ display: 'block', margin: '0 auto' }}
              className={styles.flagImage}
              onClick={(e) => {
                e.stopPropagation();
                setZoomedFlag(country.flag);
              }}
            />
          )}
        </td>

        <td className={styles.countryPopulation}>
          {formatPopulation(country.population ?? 0)}
        </td>

        <td>{formatList(country.continents) ?? '—'}</td>

        <td className={styles.countryMap}>
          {country.mapUrl ? (
            <Tooltip content={`View ${country.name} on the map`}>
              <a
                href={country.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.truncated}
              >
                View on map
              </a>
            </Tooltip>
          ) : (
            '—'
          )}
        </td>
      </motion.tr>

      {typeof document !== 'undefined' &&
        zoomedFlag &&
        createPortal(
          <div
            className={`${styles.flagOverlay} flex-center`}
            onClick={() => setZoomedFlag(null)}
          >
            <div
              className={styles.flagZoomedWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                id="flag-zoomed-image"
                src={zoomedFlag}
                alt={`Zoomed flag of ${country.name}`}
                fill
                sizes="90vw"
                className={styles.flagZoomed}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
