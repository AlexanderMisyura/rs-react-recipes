import { BoxWrapper } from '@components';
import type { Recipe } from '@ts-types';
import { Component } from 'react';

interface Props {
  recipe: Recipe;
}

export class ListItem extends Component<Props> {
  public render() {
    const { name, image, ingredients } = this.props.recipe;

    return (
      <BoxWrapper className="flex flex-row gap-4">
        <figure className="flex w-[50%] flex-col items-center justify-center gap-4">
          <figcaption className="text-xl font-bold text-orange-900">
            <h2 className="text-center text-balance">{name}</h2>
          </figcaption>
          <img
            src={image}
            className="h-50 w-full rounded-sm border-2 border-orange-900 object-cover"
            alt={name}
          />
        </figure>
        <div className="flex w-[50%] flex-col gap-4">
          <h3 className="font-bold text-orange-900">Ingredients</h3>
          <ul className="flex list-disc flex-col gap-1 pl-6 text-sm">
            {ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>;
            })}
          </ul>
        </div>
      </BoxWrapper>
    );
  }
}
