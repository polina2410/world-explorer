import { CountryResponse } from '@/types/country';
import CountryRow from '@/components/CountryRow/CountryRow';

type CountriesTableProps = {
  countries: CountryResponse[];
};

export default function CountriesTable({ countries }: CountriesTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Capital</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((c) => (
          <CountryRow key={c.name} country={c} />
        ))}
      </tbody>
    </table>
  );
}
