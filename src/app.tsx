import { Controls, Modal, OptionalColumnSelector, Table } from '@components';
import config from '@config/api.config';
import { defaultOptionalData } from '@constants';
import { DatasetSchema } from '@schemas';
import type { OptionalData, SortConfig } from '@ts-interfaces';
import { Suspense, useCallback, useState } from 'react';

const datasetPromise = fetch(config.API_URL)
  .then((res) => res.json())
  .then((json) => DatasetSchema.parse(json))
  .then((data) => {
    const transformedData = Object.entries(data).map(([key, value]) => ({
      country: key,
      data: value.data,
      iso_code: value.iso_code,
    }));

    return transformedData;
  });

export const App = () => {
  const [year, setYear] = useState<number>(2023);
  const [searchString, setSearchString] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'country',
    direction: 1,
  });
  const [optionalData, setOptionalData] = useState<OptionalData>(defaultOptionalData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateYearFilter = useCallback((year: number) => {
    setYear(year);
  }, []);
  const updateCountryFilter = useCallback((str: string) => {
    setSearchString(str);
  }, []);
  const updateSortConfig = useCallback((config: SortConfig) => {
    setSortConfig(config);
  }, []);
  const updateOptionalData = useCallback((data: OptionalData) => {
    setOptionalData(data);
  }, []);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <section className="section">
        <Controls
          datasetPromise={datasetPromise}
          year={year}
          searchString={searchString}
          sortConfig={sortConfig}
          updateCountryFilter={updateCountryFilter}
          updateYearFilter={updateYearFilter}
          updateSortConfig={updateSortConfig}
          openModal={openModal}
        />
      </section>
      <section className="section">
        <Suspense fallback={<progress className="progress is-large is-info" max="100"></progress>}>
          <Table
            datasetPromise={datasetPromise}
            optionalData={optionalData}
            yearFilter={year}
            searchFilter={searchString}
            sortConfig={sortConfig}
          />
        </Suspense>
      </section>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <OptionalColumnSelector
          optionalData={optionalData}
          updateOptionalData={updateOptionalData}
          handleClose={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
