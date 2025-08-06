import {
  BoxWrapper,
  Button,
  ErrorFallback,
  Heading,
  List,
  Pagination,
  Search,
  Spinner,
} from '@components';
import { getRecipesFetchParams } from '@utils';
import { useLocation, useNavigate, useNavigation } from 'react-router';
import { useGetItemsQuery } from 'redux/apiRecipesSlice';

export const MainPage = () => {
  const location = useLocation();
  const recipesParams = getRecipesFetchParams(new URLSearchParams(location.search));
  const {
    refetch,
    data: recipesData,
    isFetching,
    isError,
    error,
  } = useGetItemsQuery(recipesParams);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isListLoading =
    navigation.state === 'loading' && navigation.location.search !== location.search;

  const isLoading = isListLoading || isFetching;

  return (
    <>
      <Search />
      <Button onClickHandler={() => void refetch()} disabled={isLoading} className="w-[136px]">
        {isFetching ? 'Refetching...' : 'Refetch'}
      </Button>

      <div
        data-testid="main-page"
        className="flex w-full grow flex-col items-center justify-center gap-4"
      >
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorFallback
            title={'status' in error ? error.status.toString() : 'Error'}
            error={
              new Error('data' in error ? String(error.data) : 'Something went wrong with the data')
            }
            btnChildren="Back"
            resetFunction={() => void navigate(-1)}
          />
        ) : !recipesData?.recipes.length ? (
          <BoxWrapper testId="empty-fallback" className="border-2 border-orange-900">
            <Heading>Sorry, No Hot Recipes Found</Heading>
            <p className="text-xl">Try searching for something else</p>
          </BoxWrapper>
        ) : (
          <>
            <List recipesData={recipesData} />
            <Pagination total={recipesData.total} />
          </>
        )}
      </div>
    </>
  );
};
