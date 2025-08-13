import { BoxWrapper, Button, ErrorFallback, Spinner } from '@components';
import { useThemeContext } from '@hooks';
import { UrlPath } from '@ts-enums';
import { clsx } from 'clsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useGetRecipeDetailsQuery } from 'redux/apiRecipesSlice';

export const SidePanel: React.FC = () => {
  const { theme } = useThemeContext();
  const { detailsId } = useParams();
  const { data, isError, error, refetch, isFetching } = useGetRecipeDetailsQuery(detailsId ?? '');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const closeDetailsUrl = `${UrlPath.RECIPES}?${searchParams}`;

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <ErrorFallback
        title={'status' in error ? error.status.toString() : 'Error'}
        error={
          new Error('data' in error ? String(error.data) : 'Something went wrong with the data')
        }
        btnChildren="Close"
        resetFunction={() => void navigate(closeDetailsUrl)}
      />
    );
  }

  if (data) {
    return (
      <BoxWrapper
        testId="side-panel"
        className={clsx(`${theme}-text`, 'flex w-full flex-col gap-4')}
      >
        <h3 className="text-center font-bold text-balance text-orange-900">
          Instructions for cooking {data.name}
        </h3>
        <ul className="flex list-disc flex-col gap-1 pl-6 text-sm">
          {data.instructions.map((instruction) => {
            return (
              <li data-testid="instruction" key={instruction}>
                {instruction}
              </li>
            );
          })}
        </ul>
        <Button
          testId="refetch-details"
          onClickHandler={() => void refetch()}
          disabled={isFetching}
          className="w-full"
        >
          Refetch
        </Button>
        <Button className="w-full" linkTo={closeDetailsUrl}>
          Close
        </Button>
      </BoxWrapper>
    );
  }
};
