import searchIcon from '@assets/search.svg';
import { Button } from '@components';
import { searchFormDataSchema } from '@schemas';

interface SearchProps {
  searchString?: string;
  updateHandler: (searchString: string) => void;
}

export const Search: React.FC<SearchProps> = ({ searchString, updateHandler }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { searchString } = searchFormDataSchema.parse(Object.fromEntries(formData));

    updateHandler(searchString.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        name="searchString"
        defaultValue={searchString}
        className="rounded-md border-2 border-sky-200 bg-gray-50 px-4 py-2 hover:border-sky-300"
        type="search"
        placeholder="Search"
      />
      <Button testId="search-button" type="submit">
        <img src={searchIcon} className="h-6" alt="" />
      </Button>
    </form>
  );
};
