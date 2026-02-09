import { CountryResponse } from '@/types/country';
import CountryRow from '@/components/CountryRow/CountryRow';

type CountriesTableProps = {
  countries: CountryResponse[];
};

export default function CountriesTable({ countries }: CountriesTableProps) {
  return (
    <table className={'table'}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Capital</th>
          <th>Flag</th>
          <th>Population</th>
          <th>Continents</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((c, i) => (
          <CountryRow key={c.name} country={c} index={i} />
        ))}
      </tbody>
    </table>
  );
}
