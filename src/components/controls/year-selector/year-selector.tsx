import type { DatasetStored } from '@ts-types';
import { memo, use, useMemo } from 'react';

interface YearSelectorProps {
  datasetPromise: Promise<DatasetStored>;
  updateYearFilter: (year: number) => void;
  year: number;
}

export const YearSelector = memo<YearSelectorProps>(function YearSelector({
  datasetPromise,
  updateYearFilter,
  year,
}) {
  const dataset = use(datasetPromise);

  const years = useMemo(() => {
    const yearsSet = new Set<number>();
    dataset.forEach(({ data }) => {
      data.forEach(({ year }) => yearsSet.add(year));
    });
    return [...yearsSet].reverse();
  }, [dataset]);

  return (
    <div className="select">
      <select
        value={year}
        name="year"
        onChange={(e) => {
          updateYearFilter(+e.target.value);
        }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
});
