import { BoxWrapper } from '@components';
import { useThemeContext } from '@hooks';
import { UrlPath } from '@ts-enums';
import type { Recipe } from '@ts-types';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';

interface Props {
  recipe: Recipe;
}

export const ListItem: React.FC<Props> = ({ recipe }) => {
  const { theme } = useThemeContext();
  const { name, image, ingredients, id } = recipe;
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (detailsId === id.toString()) {
      itemRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [detailsId, id]);

  const queryString = [...searchParams.values()].length ? `?${searchParams.toString()}` : '';

  return (
    <Link
      ref={itemRef}
      to={`${UrlPath.RECIPES}/${id}/${queryString}`}
      preventScrollReset
      className="flex w-full scroll-mt-[92px]"
    >
      <BoxWrapper
        testId={`list-item-${id}`}
        className={clsx(
          'flex w-full cursor-pointer flex-row gap-4 transition-transform duration-200 ease-in-out hover:scale-103'
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
                  <li className={`${theme}-text`} data-testid="ingredient" key={ingredient}>
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
