import { BoxWrapper, Button, ItemSelector } from '@components';
import { useThemeContext } from '@hooks';
import { UrlPath } from '@ts-enums';
import type { Recipe } from '@ts-types';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router';

interface Props {
  recipe: Recipe;
}

export const ListItem: React.FC<Props> = ({ recipe }) => {
  const { theme } = useThemeContext();
  const { name, image, ingredients, id } = recipe;
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailsId === id.toString()) {
      itemRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [detailsId, id]);

  return (
    <BoxWrapper
      ref={itemRef}
      testId={`list-item-${id}`}
      className={clsx(
        '@container/itemWrapper flex h-full w-full scroll-mt-[83px] flex-row items-stretch gap-4 transition-transform duration-200 ease-in-out hover:scale-102'
      )}
    >
      <div
        className={clsx(
          'flex w-full gap-4',
          detailsId ? 'flex-col' : 'flex-col @sm/itemWrapper:flex-row'
        )}
      >
        <figure className={clsx('flex flex-col items-center justify-center gap-4', 'w-full')}>
          <figcaption className="text-xl font-bold text-orange-900">
            <h2 className="text-center text-balance">{name}</h2>
          </figcaption>
          <img
            src={image}
            className="h-50 w-full rounded-sm border-2 border-orange-900 object-cover"
            alt={name}
          />
          <div className="flex w-full grow flex-col items-center justify-end">
            <Button linkTo={`${UrlPath.RECIPES}/${id}?${searchParams}`} className="w-full">
              Details
            </Button>
          </div>
        </figure>
        <div className={clsx('flex grow flex-col gap-4', 'w-full')}>
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
          <div className="flex grow flex-col items-center justify-end">
            <ItemSelector recipe={recipe} />
          </div>
        </div>
      </div>
    </BoxWrapper>
  );
};
