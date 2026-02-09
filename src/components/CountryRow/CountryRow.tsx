import { CountryResponse } from '@/types/country';

type CountryRowProps = {
  country: CountryResponse;
};

export default function CountryRow({ country }: CountryRowProps) {
  return (
    <tr>
      <td>{country.name}</td>
      <td>{country.capital ?? '—'}</td>
    </tr>
  );
}
