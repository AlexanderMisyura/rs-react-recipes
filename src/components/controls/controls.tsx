import { Search, SortSelector, YearSelector } from '@components';
import type { SortConfig } from '@ts-interfaces';
import type { DatasetStored } from '@ts-types';
import { memo } from 'react';

interface ControlsProps {
  datasetPromise: Promise<DatasetStored>;
  year: number;
  searchString: string;
  sortConfig: SortConfig;
  updateCountryFilter: (country: string) => void;
  updateYearFilter: (year: number) => void;
  updateSortConfig: (sortConfig: SortConfig) => void;
  openModal: () => void;
}

export const Controls = memo<ControlsProps>(function Controls({
  datasetPromise,
  year,
  searchString,
  sortConfig,
  updateYearFilter,
  updateCountryFilter,
  updateSortConfig,
  openModal,
}) {
  return (
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <Search updateCountryFilter={updateCountryFilter} country={searchString} />
        </div>
      </div>

      <div className="level-item">
        <YearSelector
          datasetPromise={datasetPromise}
          updateYearFilter={updateYearFilter}
          year={year}
        />
      </div>

      <div className="level-item">
        <SortSelector sortConfig={sortConfig} updateSortConfig={updateSortConfig} />
      </div>

      <div className="level-right">
        <p className="level-item">
          <button onClick={openModal} type="button" className="button">
            More data
          </button>
        </p>
      </div>
    </div>
  );
});
