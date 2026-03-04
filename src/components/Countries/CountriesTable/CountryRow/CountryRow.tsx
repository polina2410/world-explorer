import Image from 'next/image';
import { CountryResponse } from '@/types/country';
import { formatList, formatPopulation } from '@/utils/utils';
import styles from './CountryRow.module.css';
import Tooltip from '@/components/Tooltip/Tooltip';

type CountryRowProps = {
  country: CountryResponse;
  index: number;
};

export default function CountryRow({ country, index }: CountryRowProps) {
  return (
    <tr className={styles.countryRow}>
      <td className={styles.countryIndex}>{index + 1}</td>
      <td className={styles.countryName}>{country.name}</td>
      <td className={styles.countryCapital}>{country.capital ?? '—'}</td>

      <td className={styles.countryFlag}>
        {country.flag && (
          <Image
            src={country.flag}
            alt={`${country.name} flag`}
            width={24}
            height={16}
          />
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
  );
}
