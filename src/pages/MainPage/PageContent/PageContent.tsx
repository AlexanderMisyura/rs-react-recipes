import { BoxWrapper, ErrorFallback, Heading, List, Pagination, Spinner } from '@components';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RecipesResponse } from '@ts-types';
import { useNavigate } from 'react-router';

interface PageContentProps {
  isLoading: boolean;
  recipesData: RecipesResponse | undefined;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const PageContent: React.FC<PageContentProps> = ({
  isLoading,
  recipesData,
  isError,
  error,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError && error) {
    return (
      <ErrorFallback
        title={'status' in error ? error.status.toString() : 'Error'}
        error={
          new Error('data' in error ? String(error.data) : 'Something went wrong with the data')
        }
        btnChildren="Back"
        resetFunction={() => void navigate(-1)}
      />
    );
  }

  return recipesData?.recipes.length ? (
    <>
      <List recipesData={recipesData} />
      <Pagination total={recipesData.total} />
    </>
  ) : (
    <BoxWrapper testId="empty-fallback" className="border-2 border-orange-900">
      <Heading>Sorry, No Hot Recipes Found</Heading>
      <p className="text-xl">Try searching for something else</p>
    </BoxWrapper>
  );
};
