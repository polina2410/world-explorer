import Image from 'next/image';
import { CountryResponse } from '@/types/country';
import { formatList, formatPopulation } from '@/utils/utils';

type CountryRowProps = {
  country: CountryResponse;
  index: number;
};

export default function CountryRow({ country, index }: CountryRowProps) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{country.name}</td>
      <td>{country.capital ?? '—'}</td>
      <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {country.flag && (
          <Image
            src={country.flag}
            alt={`${country.name} flag`}
            width={24}
            height={16}
            style={{ objectFit: 'cover' }}
          />
        )}
      </td>
      <td>{formatPopulation(country.population ?? 0)}</td>
      <td>{formatList(country.continents) ?? '—'}</td>
      <td>{country.mapUrl ?? '—'}</td>
    </tr>
  );
}
