import { BoxWrapper, Heading, ListItem } from '@components';
import type { RecipesResponse } from '@ts-types';

interface ListProps {
  recipesData: RecipesResponse;
}

export const List: React.FC<ListProps> = ({ recipesData }) => {
  const { recipes, total } = recipesData;

  return (
    <div data-testid="list" className="flex w-full max-w-2xl flex-col gap-4">
      <BoxWrapper>
        <Heading>{total === 1 ? '1 Recipe Found' : `${total} Recipes Found`}</Heading>
      </BoxWrapper>

      <ul className="flex w-full flex-col gap-4">
        {recipes.map((recipe) => {
          return (
            <li key={recipe.id}>
              <ListItem recipe={recipe} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
