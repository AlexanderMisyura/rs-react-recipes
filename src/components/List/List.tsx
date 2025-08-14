import { BoxWrapper, Heading, ListItem } from '@components';
import type { RecipesResponse } from '@ts-types';
import { clsx } from 'clsx';
import { Outlet, useParams } from 'react-router';

interface ListProps {
  recipesData: RecipesResponse;
}

export const List: React.FC<ListProps> = ({ recipesData }) => {
  const { recipes, total } = recipesData;
  const { detailsId } = useParams();

  return (
    <div
      data-testid="list"
      className={clsx(
        'flex w-full max-w-5xl flex-col items-center gap-4 px-2',
        '@container/listWrapper'
      )}
    >
      <BoxWrapper>
        <Heading>{total === 1 ? '1 Recipe Found' : `${total} Recipes Found`}</Heading>
      </BoxWrapper>

      <div
        className={clsx(
          'grid w-full',
          '@max-md/listWrapper:grid-cols-1',
          detailsId ? 'grid-cols-2 gap-2' : 'grid-cols-[1fr_auto] gap-0',
          recipes.length <= total && 'mb-4'
        )}
      >
        <ul
          className={clsx(
            'grid w-full grid-cols-1 gap-4',
            detailsId ? '@max-md/listWrapper:hidden' : 'sm:grid-cols-2'
          )}
        >
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id}>
                <ListItem recipe={recipe} />
              </li>
            );
          })}
        </ul>
        <div className="sticky top-[92px] flex h-max w-full flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
