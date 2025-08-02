import { useThemeContext } from '@hooks';
import type { Recipe } from '@ts-types';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { add, remove } from 'redux/recipesSlice';

interface ItemSelectorProps {
  recipe: Recipe;
}

export const ItemSelector: React.FC<ItemSelectorProps> = ({ recipe }) => {
  const { theme } = useThemeContext();
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
    <label
      className={clsx(
        'flex items-center gap-4 px-4 py-2',
        'cursor-pointer rounded-md border-2 border-transparent text-center font-bold tracking-wide text-orange-900 shadow-sm select-none',
        'active:shadow-inner',
        `${theme}-button`,
        'transition-colors'
      )}
    >
      <span className={`${theme}-text`}>Select Recipe</span>
      <input onChange={handleCheck} checked={isChecked} type="checkbox" id={id.toString()} />
    </label>
  );
};
