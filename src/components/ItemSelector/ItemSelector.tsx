import { add, remove } from '@redux/recipesSlice';
import type { Recipe } from '@ts-types';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

interface ItemSelectorProps {
  recipe: Recipe;
}

export const ItemSelector: React.FC<ItemSelectorProps> = ({ recipe }) => {
  const t = useTranslations('ItemSelector');
  const dispatch = useAppDispatch();

  const { id } = recipe;
  const isChecked = useAppSelector((state) =>
    state.recipes.recipesChecked.some((recipe) => recipe.id === id)
  );

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(add(recipe));
    } else {
      dispatch(remove(id));
    }
  };

  return (
    <label className="button flex w-full items-center justify-center gap-2">
      <span>{t('select')}</span>
      <input
        data-testid="item-selector"
        className="selector"
        onChange={handleCheck}
        checked={isChecked}
        type="checkbox"
        id={id.toString()}
      />
    </label>
  );
};
