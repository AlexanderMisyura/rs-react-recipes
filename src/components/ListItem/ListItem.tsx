import { BoxWrapper } from '@components';
import { UrlPath } from '@ts-enums';
import type { Recipe } from '@ts-types';
import { clsx } from 'clsx';
import { Link, useParams, useSearchParams } from 'react-router';

interface Props {
  recipe: Recipe;
}

export const ListItem: React.FC<Props> = ({ recipe }) => {
  const { name, image, ingredients, id } = recipe;
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();

  const queryString = [...searchParams.values()].length ? `?${searchParams.toString()}` : '';

  return (
    <Link to={`${UrlPath.RECIPES}/${id}/${queryString}`} viewTransition className="flex w-full">
      <BoxWrapper
        testId={`list-item-${id}`}
        className={clsx(
          'flex cursor-pointer flex-row gap-4 transition-transform duration-200 ease-in-out hover:scale-103',
          'w-full'
        )}
      >
        <div className={clsx('flex w-full gap-4', detailsId ? 'flex-col' : 'flex-row')}>
          <figure className={clsx('flex flex-col items-center justify-center gap-4', 'w-full')}>
            <figcaption className="text-xl font-bold text-orange-900">
              <h2 className="text-center text-balance">{name}</h2>
            </figcaption>
            <img
              src={image}
              className="h-50 w-full rounded-sm border-2 border-orange-900 object-cover"
              alt={name}
            />
          </figure>
          <div className={clsx('flex flex-col gap-4', 'w-full')}>
            <h3 className="font-bold text-orange-900">Ingredients</h3>
            <ul className="flex list-disc flex-col gap-1 pl-6 text-left text-sm">
              {ingredients.map((ingredient) => {
                return (
                  <li data-testid="ingredient" key={ingredient}>
                    {ingredient}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </BoxWrapper>
    </Link>
  );
};
