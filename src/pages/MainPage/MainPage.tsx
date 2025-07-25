import { BoxWrapper, ErrorFallback, Heading, List, Search, Spinner } from '@components';
import config from '@config/api.config';
import { apiController } from '@controllers';
import { useLocalStorage } from '@hooks';
import { storageService } from '@services';
import type { RecipesResponse } from '@ts-types';
import { useEffect, useState } from 'react';

const MAX_LIMIT = String(config.MAX_ITEMS);
const PER_PAGE_LIMIT = String(config.ITEMS_PER_PAGE);
const DEFAULT_RECIPES_DATA: RecipesResponse = { recipes: [], skip: 0, total: 0 };

export const MainPage = () => {
  const [searchString, setSearchString] = useLocalStorage('searchString');
  const [recipesData, setRecipesData] = useState(DEFAULT_RECIPES_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const updateSearch = (searchString: string) => {
    storageService.setItem('searchString', searchString);
    setSearchString(searchString);
  };

  useEffect(() => {
    let isFetchCanceled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params: Record<string, string> = {
          q: searchString,
          limit: searchString === '' ? MAX_LIMIT : PER_PAGE_LIMIT,
        };

        const recipesResponse = await apiController.getItems(params);
        if (!isFetchCanceled) {
          setRecipesData(recipesResponse);
        }
      } catch (error: unknown) {
        if (error instanceof Error && !isFetchCanceled) {
          setError(error);
          setRecipesData(DEFAULT_RECIPES_DATA);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();

    return () => {
      isFetchCanceled = true;
    };
  }, [searchString]);

  return (
    <>
      <Search searchString={searchString} updateHandler={updateSearch} />

      <div className="flex grow flex-col items-center justify-center gap-4">
        {loading && <Spinner />}

        {error && (
          <ErrorFallback error={error} title="Sorry, an error occurred while fetching recipes" />
        )}

        {!loading && recipesData.recipes.length > 0 && <List recipesData={recipesData} />}

        {!loading && !error && recipesData.recipes.length === 0 && (
          <BoxWrapper testId="empty-fallback" className="border-2 border-orange-900">
            <Heading>Sorry, No Hot Recipes Found</Heading>
            <p className="text-xl">Try searching for something else</p>
          </BoxWrapper>
        )}
      </div>
    </>
  );
};
