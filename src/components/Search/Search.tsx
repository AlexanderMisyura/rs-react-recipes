import searchIcon from '@assets/search.svg';
import { Button } from '@components';
import { searchFormDataSchema } from '@schemas';
import { Component } from 'react';

interface Props {
  searchString?: string;
  updateHandler: (searchString: string) => void;
}

export class Search extends Component<Props> {
  public boundSubmitHandler = this.submitHandler.bind(this);

  public submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { searchString } = searchFormDataSchema.parse(Object.fromEntries(formData));

    this.props.updateHandler(searchString.trim());
  }

  public render() {
    return (
      <form onSubmit={this.boundSubmitHandler} className="flex items-center gap-2">
        <input
          name="searchString"
          defaultValue={this.props.searchString}
          className="rounded-md border-2 border-sky-200 bg-gray-50 px-4 py-2 hover:border-sky-300"
          type="search"
          placeholder="Search"
        />
        <Button testId="search-button" type="submit">
          <img src={searchIcon} className="h-6" alt="" />
        </Button>
      </form>
    );
  }
}
