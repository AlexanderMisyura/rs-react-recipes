import { BoxWrapper, Heading, ListItem, Spinner } from '@components';
import type { RecipesResponse } from '@ts-types';
import { clsx } from 'clsx';
import { Outlet, useNavigation, useParams } from 'react-router';

interface ListProps {
  recipesData: RecipesResponse;
}

export const List: React.FC<ListProps> = ({ recipesData }) => {
  const { recipes, total } = recipesData;
  const { detailsId } = useParams();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <div data-testid="list" className="flex w-full max-w-2xl flex-col gap-4 px-2">
      <BoxWrapper>
        <Heading>{total === 1 ? '1 Recipe Found' : `${total} Recipes Found`}</Heading>
      </BoxWrapper>

      <div
        className={clsx(
          'grid w-full gap-2',
          detailsId ? 'grid-cols-2' : 'grid-cols-1',
          recipes.length <= total && 'mb-4'
        )}
      >
        <ul className={clsx('flex flex-col gap-4', 'w-full')}>
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id}>
                <ListItem recipe={recipe} />
              </li>
            );
          })}
        </ul>
        {detailsId && (
          <div className="sticky top-[92px] flex h-max w-full flex-col items-center justify-center">
            {isLoading ? <Spinner /> : <Outlet />}
          </div>
        )}
      </div>
    </div>
  );
};
