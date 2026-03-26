'use client';

import SearchIcon from '@assets/search.svg';
import { BoxWrapper, Button } from '@components';
import { PARAMS_MAP, STORAGE_KEY } from '@constants';
import { useRouter } from '@i18n/navigation';
import { searchFormDataSchema } from '@schemas';
import { UrlPath } from '@ts-enums';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

export const Search: React.FC = () => {
  const t = useTranslations('Search');
  const searchParams = useSearchParams();
  const searchString = searchParams.get(PARAMS_MAP[STORAGE_KEY.SEARCH_STRING]) ?? '';
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchData = searchFormDataSchema.parse(Object.fromEntries(formData));
    const trimmedSearch = searchData.q.trim();

    const submission: { q?: string } = {};

    if (trimmedSearch) {
      submission.q = trimmedSearch;
    }

    const params = new URLSearchParams(submission);
    router.push(`${UrlPath.RECIPES}?${params}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedSearch = e.target.value.trim();
    if (trimmedSearch === '') {
      router.push(UrlPath.RECIPES);
    }
  };

  return (
    <BoxWrapper className="mx-2 flex">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          name={PARAMS_MAP[STORAGE_KEY.SEARCH_STRING]}
          defaultValue={searchString}
          className="search-input text"
          type="search"
          placeholder={t('placeholder')}
          onChange={handleChange}
        />
        <Button testId="search-button" type="submit">
          <SearchIcon width={32} height={32} className="h-6" alt={t('submit')} />
        </Button>
      </form>
    </BoxWrapper>
  );
};
