import { BoxWrapper, Button } from '@components';
import { useThemeContext } from '@hooks';
import type { RecipeInstructionsResponse } from '@ts-types';
import { clsx } from 'clsx';
import { useLoaderData, useSearchParams } from 'react-router';

export const SidePanel: React.FC = () => {
  const { theme } = useThemeContext();
  const { instructions, name } = useLoaderData<RecipeInstructionsResponse>();
  const [searchParams] = useSearchParams();

  const queryString = [...searchParams.values()].length > 0 ? `?${searchParams.toString()}` : '';

  return (
    <BoxWrapper testId="side-panel" className={clsx(`${theme}-text`, 'flex w-full flex-col gap-4')}>
      <h3 className="text-center font-bold text-balance text-orange-900">
        Instructions for cooking {name}
      </h3>
      <ul className="flex list-disc flex-col gap-1 pl-6 text-sm">
        {instructions.map((instruction) => {
          return (
            <li data-testid="instruction" key={instruction}>
              {instruction}
            </li>
          );
        })}
      </ul>
      <Button className="text-orange-900" linkTo={`../${queryString}`}>
        Close
      </Button>
    </BoxWrapper>
  );
};
