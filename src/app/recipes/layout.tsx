'use client';

import { BoxWrapper, ErrorFallback, Heading, List, Pagination, Search, Spinner } from '@components';
import { useGetRecipesQuery } from '@redux/apiRecipesSlice';
import { getRecipesFetchParams } from '@utils';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

interface RecipesLayoutProps {
  children: React.ReactNode;
  sidepanel: React.ReactNode;
}

const RecipesLayout: React.FC<RecipesLayoutProps> = ({ sidepanel }) => {
  const searchParams = useSearchParams();
  const params = useParams<{ detailsId?: string }>();

  const recipesParams = getRecipesFetchParams(new URLSearchParams(searchParams ?? ''));
  const { data: recipesData, isFetching, isError, error } = useGetRecipesQuery(recipesParams);
  const router = useRouter();

  let PageContent;

  if (isFetching) {
    PageContent = <Spinner />;
  }

  if (isError) {
    PageContent = (
      <ErrorFallback
        title={'status' in error ? error.status.toString() : 'Error'}
        error={
          new Error(
            'data' in error
              ? String((error.data as { message: string }).message)
              : 'Something went wrong with the data'
          )
        }
        btnChildren="Back"
        resetFunction={() => {
          router.back();
        }}
      />
    );
  }

  if (recipesData) {
    PageContent = recipesData.recipes.length ? (
      <>
        <List recipesData={recipesData} sidePanel={params?.detailsId ? sidepanel : null} />
        <Pagination total={recipesData.total} />
      </>
    ) : (
      <BoxWrapper testId="empty-fallback" className="border-2 border-orange-900">
        <Heading>Sorry, No Hot Recipes Found</Heading>
        <p className="text-xl">Try searching for something else</p>
      </BoxWrapper>
    );
  }

  return (
    <>
      <Search />

      <div
        data-testid="main-page"
        className="flex w-full grow flex-col items-center justify-center gap-4"
      >
        {PageContent}
      </div>
    </>
  );
};

export default RecipesLayout;
