import { Controls, Modal, OptionalColumnSelector, Table } from '@components';
import config from '@config/api.config';
import { defaultOptionalData } from '@constants';
import { DatasetSchema } from '@schemas';
import type { OptionalData, SortConfig } from '@ts-interfaces';
import { Suspense, useState } from 'react';

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

  return (
    <>
      <section className="section">
        <Controls
          datasetPromise={datasetPromise}
          year={year}
          searchString={searchString}
          sortConfig={sortConfig}
          updateCountryFilter={setSearchString}
          updateYearFilter={setYear}
          updateSortConfig={setSortConfig}
          openModal={() => {
            setIsModalOpen(true);
          }}
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
      <Modal
        isOpen={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
      >
        <OptionalColumnSelector
          optionalData={optionalData}
          updateOptionalData={setOptionalData}
          handleClose={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
