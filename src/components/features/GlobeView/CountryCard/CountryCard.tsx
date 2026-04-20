'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { CountryResponse } from '@/types/country';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import styles from './CountryCard.module.css';

type Props = {
  country: CountryResponse;
  onClose: () => void;
};

export const CountryCard = ({ country, onClose }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useFocusTrap(cardRef, true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const population =
    country.population !== undefined
      ? country.population.toLocaleString()
      : 'N/A';

  const capital = country.capital ?? 'N/A';

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${country.name}`}
      className={styles.card}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close country details"
      >
        &times;
      </button>

      {country.flag && (
        <div className={styles.flagWrapper}>
          <Image
            src={country.flag}
            alt={`Flag of ${country.name}`}
            fill
            className={styles.flagImage}
            sizes="120px"
          />
        </div>
      )}

      <h2 className={styles.countryName}>{country.name}</h2>

      <dl className={styles.details}>
        <div className={styles.detailRow}>
          <dt className={styles.detailLabel}>Capital</dt>
          <dd className={styles.detailValue}>{capital}</dd>
        </div>
        <div className={styles.detailRow}>
          <dt className={styles.detailLabel}>Population</dt>
          <dd className={styles.detailValue}>{population}</dd>
        </div>
      </dl>
    </div>
  );
};
