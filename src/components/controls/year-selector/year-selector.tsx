import type { DatasetStored } from '@ts-types';
import { use, useRef } from 'react';

interface YearSelectorProps {
  datasetPromise: Promise<DatasetStored>;
  updateYearFilter: (year: number) => void;
  year: number;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  datasetPromise,
  updateYearFilter,
  year,
}) => {
  const yearsRef = useRef(new Set<number>());

  use(datasetPromise).forEach(({ data }) => {
    data.forEach(({ year }) => yearsRef.current.add(year));
  });

  return (
    <div className="select">
      <select
        value={year}
        name="year"
        onChange={(e) => {
          updateYearFilter(+e.target.value);
        }}
      >
        {[...yearsRef.current].reverse().map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
