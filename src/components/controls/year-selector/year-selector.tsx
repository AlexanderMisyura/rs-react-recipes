import type { DatasetStored } from '@ts-types';
import { clsx } from 'clsx';
import { use, useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

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
  const [isActive, setIsActive] = useState<boolean>(false);
  const yearSelectorRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef(new Set<number>());

  use(datasetPromise).forEach(({ data }) => {
    data.forEach(({ year }) => yearsRef.current.add(year));
  });

  useEffect(() => {
    setIsActive(false);
  }, [year]);

  return (
    <div ref={yearSelectorRef} className={clsx(isActive && 'is-active', 'dropdown')}>
      <div className="dropdown-trigger">
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
          type="button"
          className="button w-[135px]"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>Year - {year}</span>
          <span className="icon">{isActive ? <FaAngleUp /> : <FaAngleDown />}</span>
        </button>
      </div>
      <div className="dropdown-menu min-w-[135px]!" id="dropdown-menu" role="menu">
        <div className="dropdown-content max-h-[300px] overflow-y-auto">
          {[...yearsRef.current].reverse().map((year) => (
            <button
              onClick={() => {
                updateYearFilter(year);
              }}
              type="button"
              key={year}
              className="dropdown-item has-text-centered pr-2"
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
