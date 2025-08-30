import type { OptionalData, SortConfig } from '@ts-interfaces';
import type { DatasetStored } from '@ts-types';
import { use, useRef } from 'react';

import { Cell } from './cell/cell';

interface ListProps {
  datasetPromise: Promise<DatasetStored>;
  optionalData: OptionalData;
  yearFilter: number;
  searchFilter: string;
  sortConfig: SortConfig;
}

export const Table: React.FC<ListProps> = ({
  datasetPromise,
  optionalData,
  yearFilter,
  searchFilter,
  sortConfig,
}) => {
  const rawDataRef = useRef<DatasetStored>(use(datasetPromise));

  const processedData = rawDataRef.current
    .filter(({ country }) => country.toLowerCase().includes(searchFilter.toLowerCase()))
    .map((entry) => {
      const filteredDataItems = entry.data.filter((item) => item.year === yearFilter);
      return { ...entry, data: filteredDataItems };
    })
    .filter(({ data }) => data.find((item) => item.year === yearFilter))
    .sort((a, b) => {
      const { key, direction } = sortConfig;

      if (key === 'country') {
        return a.country.localeCompare(b.country) * direction;
      }

      return ((a.data[0].population ?? 0) - (b.data[0].population ?? 0)) * direction;
    });

  if (!processedData.length) {
    return <div className="box container w-max! text-2xl">No data found</div>;
  }

  return (
    <div className="box table-container container w-max!">
      <table className="is-striped is-hoverable is-narrow table">
        <thead>
          <tr>
            <th>Country</th>
            <th>ISO</th>
            <th>Population</th>
            <th>Year</th>
            <th>CO2</th>
            <th>CO2 per capita</th>
            {optionalData.methane && <th>Methane</th>}
            {optionalData.oil_co2 && <th>Oil CO2</th>}
            {optionalData.temperature_change_from_co2 && <th>Temp. change from CO2</th>}
          </tr>
        </thead>
        <tbody>
          {processedData.map(({ country, data, iso_code }) => {
            return (
              <tr key={country}>
                <th>{country}</th>
                <Cell value={iso_code} />
                <Cell value={data[0].population} />
                <Cell value={data[0].year} />
                <Cell value={data[0].co2} />
                <Cell value={data[0].co2_per_capita} />
                {optionalData.methane && <Cell value={data[0].methane} />}
                {optionalData.oil_co2 && <Cell value={data[0].oil_co2} />}
                {optionalData.temperature_change_from_co2 && (
                  <Cell value={data[0].temperature_change_from_co2} />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
