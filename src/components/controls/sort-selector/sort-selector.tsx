import type { SortConfig, SortDirection, SortKey } from '@ts-interfaces';
import { memo } from 'react';

interface SortSelectorProps {
  sortConfig: SortConfig;
  updateSortConfig: (sortConfig: SortConfig) => void;
}

export const SortSelector = memo<SortSelectorProps>(function SortSelector({
  sortConfig,
  updateSortConfig,
}) {
  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const key = formData.get('key') as SortKey;
    const direction = +(formData.get('direction') as string) as SortDirection;

    updateSortConfig({ key, direction });
  };

  return (
    <form onChange={handleChange} className="flex gap-4">
      <fieldset className="flex flex-col gap-1">
        <legend className="font-bold">Sort By:</legend>
        <label className="radio flex! items-center gap-1">
          <input
            type="radio"
            name="key"
            value="country"
            defaultChecked={sortConfig.key === 'country'}
          />
          <span>Country</span>
        </label>
        <label className="radio flex! items-center gap-1">
          <input
            type="radio"
            name="key"
            value="population"
            defaultChecked={sortConfig.key === 'population'}
          />
          <span>Population</span>
        </label>
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <legend className="font-bold">Direction:</legend>
        <label className="radio flex! items-center gap-1">
          <input
            type="radio"
            name="direction"
            value="1"
            defaultChecked={sortConfig.direction === 1}
          />
          <span>Asc</span>
        </label>
        <label className="radio flex! items-center gap-1">
          <input
            type="radio"
            name="direction"
            value="-1"
            defaultChecked={sortConfig.direction === -1}
          />
          <span>Desc</span>
        </label>
      </fieldset>
    </form>
  );
});
