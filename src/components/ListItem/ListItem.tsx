'use client';

import { BoxWrapper, Button, ItemSelector } from '@components';
import { UrlPath } from '@ts-enums';
import type { Recipe } from '@ts-types';
import { clsx } from 'clsx';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

interface Props {
  isSidePanelOpen: boolean;
  recipe: Recipe;
}

export const ListItem: React.FC<Props> = ({ isSidePanelOpen, recipe }) => {
  const t = useTranslations('ListItem');
  const { name, image, ingredients, id } = recipe;
  const params = useParams<{ detailsId?: string }>();
  const searchParams = useSearchParams();
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.detailsId === id.toString()) {
      itemRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [params.detailsId, id, isSidePanelOpen]);

  return (
    <BoxWrapper
      ref={itemRef}
      testId={`list-item-${id}`}
      className={clsx(
        '@container/itemWrapper h-full w-full scroll-mt-[92px] flex-row items-stretch outline-2 outline-transparent transition-colors duration-200 ease-in-out hover:outline-orange-900'
      )}
    >
      <div
        className={clsx(
          'flex w-full gap-4',
          isSidePanelOpen ? 'flex-col' : 'flex-col @sm/itemWrapper:flex-row'
        )}
      >
        <figure
          className={clsx('flex flex-col items-center justify-center gap-4', 'relative w-full')}
        >
          <figcaption className="text-xl font-bold text-orange-900">
            <h2 className="text-center text-balance">{name}</h2>
          </figcaption>
          <Image
            priority
            height={200}
            width={200}
            src={image}
            className="h-50 w-full rounded-sm border-2 border-orange-900 object-cover"
            alt={name}
          />
          <div className="flex w-full grow flex-col items-center justify-end">
            <Button
              linkTo={`${UrlPath.RECIPES}/${id}?${searchParams.toString()}`}
              className="w-full"
            >
              {t('details')}
            </Button>
          </div>
        </figure>
        <div className={clsx('flex grow flex-col gap-4', 'w-full')}>
          <h3 className="font-bold text-orange-900">{t('ingredients')}</h3>
          <ul className="flex list-disc flex-col gap-1 pl-6 text-left text-sm">
            {ingredients.map((ingredient) => {
              return (
                <li className="text" data-testid="ingredient" key={ingredient}>
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
