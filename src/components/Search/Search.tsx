'use client';

import SearchIcon from '@assets/search.svg';
import { BoxWrapper, Button } from '@components';
import { PARAMS_MAP, STORAGE_KEY } from '@constants';
import { useParamToStorageSync, useThemeContext } from '@hooks';
import { useRouter } from '@i18n/navigation';
import { searchFormDataSchema } from '@schemas';
import { UrlPath } from '@ts-enums';
import { clsx } from 'clsx';

export const Search: React.FC = () => {
  const { theme } = useThemeContext();
  const [searchString, setSearchString] = useParamToStorageSync(STORAGE_KEY.SEARCH_STRING);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchData = searchFormDataSchema.parse(Object.fromEntries(formData));
    const trimmedSearch = searchData.q.trim();

    setSearchString(trimmedSearch);

    const submission: { q?: string } = {};

    if (trimmedSearch) {
      submission.q = trimmedSearch;
    }

    const params = new URLSearchParams(submission);
    router.push(`${UrlPath.RECIPES}?${params}`);
  };

  return (
    <BoxWrapper className="mx-2 flex">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          name={PARAMS_MAP[STORAGE_KEY.SEARCH_STRING]}
          defaultValue={searchString}
          className={clsx(`${theme}-search`, `${theme}-text`, 'rounded-md border-2 px-4 py-2')}
          type="search"
          placeholder="Search"
        />
        <Button testId="search-button" type="submit">
          <SearchIcon width={32} height={32} className="h-6" alt="search submit" />
        </Button>
      </form>
    </BoxWrapper>
  );
};
