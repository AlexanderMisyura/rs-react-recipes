import { BoxWrapper, Heading, List, Pagination, Search, Spinner } from '@components';
import type { RecipesResponse } from '@ts-types';
import { useLoaderData, useNavigation } from 'react-router';

export const MainPage = () => {
  const recipesData = useLoaderData<RecipesResponse>();
  const navigation = useNavigation();

  const loading = navigation.state === 'loading';

  return (
    <>
      <Search />

      <div data-testid="main-page" className="flex grow flex-col items-center justify-center gap-4">
        {loading && <Spinner />}

        {!loading && recipesData.recipes.length > 0 && (
          <>
            <List recipesData={recipesData} />
            <Pagination total={recipesData.total} />
          </>
        )}

        {!loading && recipesData.recipes.length === 0 && (
          <BoxWrapper testId="empty-fallback" className="border-2 border-orange-900">
            <Heading>Sorry, No Hot Recipes Found</Heading>
            <p className="text-xl">Try searching for something else</p>
          </BoxWrapper>
        )}
      </div>
    </>
  );
};
