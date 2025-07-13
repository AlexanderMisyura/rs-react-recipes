import {
  BoxWrapper,
  ErrorFallback,
  ErrorTrigger,
  Header,
  Heading,
  List,
  Search,
  Spinner,
} from '@components';
import config from '@config/api.config';
import { apiController } from '@controllers';
import { storageService } from '@services';
import type { RecipesResponse } from '@ts-types';
import { Component } from 'react';

interface State {
  searchString: string;
  recipesData: RecipesResponse;
  loading: boolean;
  error: Error | null;
}

const MAX_LIMIT = String(config.MAX_ITEMS);
const PER_PAGE_LIMIT = String(config.ITEMS_PER_PAGE);

export class App extends Component {
  public state: State = {
    searchString: storageService.getItem('searchString') ?? '',
    recipesData: { recipes: [], skip: 0, total: 0 },
    loading: true,
    error: null,
  };

  public boundUpdateSearch = this.updateSearch.bind(this);

  public updateSearch(searchString: string) {
    storageService.setItem('searchString', searchString);
    this.setState({ searchString });
  }

  public getRecipes() {
    this.setState({ loading: true, error: null });

    const params: Record<string, string> = {
      q: this.state.searchString,
      limit: this.state.searchString === '' ? MAX_LIMIT : PER_PAGE_LIMIT,
    };

    apiController
      .getItems(params)
      .then((recipesResponse) => {
        this.setState({ recipesData: recipesResponse, loading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          this.setState({ error, loading: false });
        }
      });
  }

  public componentDidMount(): void {
    this.getRecipes();
  }

  public componentDidUpdate(_prevProps: Readonly<object>, prevState: Readonly<State>): void {
    const search = this.state.searchString;
    const prevSearch = prevState.searchString;

    if (search !== prevSearch) {
      this.getRecipes();
    }
  }

  public render() {
    const { recipesData, loading, error } = this.state;

    return (
      <div className="flex w-full grow flex-col gap-4">
        <Header>
          <Search searchString={this.state.searchString} updateHandler={this.boundUpdateSearch} />
        </Header>

        <main className="flex grow flex-col items-center justify-center">
          {loading && <Spinner />}

          {error && (
            <ErrorFallback error={error} title="Sorry, an error occurred while fetching recipes" />
          )}

          {!loading && recipesData.recipes.length > 0 && <List recipesData={recipesData} />}

          {!loading && !error && recipesData.recipes.length === 0 && (
            <BoxWrapper className="border-2 border-orange-900">
              <Heading>Sorry, No Hot Recipes Found</Heading>
              <p className="text-xl">Try searching for something else</p>
            </BoxWrapper>
          )}
        </main>

        <ErrorTrigger />
      </div>
    );
  }
}
