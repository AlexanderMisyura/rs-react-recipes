import { BoxWrapper, Heading, ListItem } from '@components';
import type { RecipesResponse } from '@ts-types';
import { Component } from 'react';

interface Props {
  recipesData: RecipesResponse;
}

export class List extends Component<Props> {
  public render() {
    const {
      recipesData: { recipes, total },
    } = this.props;

    return (
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <BoxWrapper>
          <Heading>{total === 1 ? '1 Recipe Found' : `${total.toString()} Recipes Found`}</Heading>
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
  }
}
