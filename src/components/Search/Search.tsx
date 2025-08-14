import searchIcon from '@assets/search.svg';
import { BoxWrapper, Button } from '@components';
import { STORAGE_KEY } from '@constants';
import { useParamToStorageSync, useThemeContext } from '@hooks';
import { searchFormDataSchema } from '@schemas';
import { clsx } from 'clsx';
import { Form, useSubmit } from 'react-router';

export const Search: React.FC = () => {
  const { theme } = useThemeContext();
  const [searchString, setSearchString] = useParamToStorageSync(STORAGE_KEY.SEARCH_STRING);
  const submit = useSubmit();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchData = searchFormDataSchema.parse(Object.fromEntries(formData));
    const trimmedSearch = searchData.q.trim();

    setSearchString(trimmedSearch);

    const submission: { q?: string } = {};

    if (trimmedSearch) {
      submission.q = trimmedSearch;
    }
    void submit(submission, { viewTransition: true });
  };

  return (
    <BoxWrapper className="mx-2 flex">
      <Form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          name="q"
          defaultValue={searchString}
          className={clsx(`${theme}-search`, `${theme}-text`, 'rounded-md border-2 px-4 py-2')}
          type="search"
          placeholder="Search"
        />
        <Button testId="search-button" type="submit">
          <img src={searchIcon} className="h-6" alt="search submit" />
        </Button>
      </Form>
    </BoxWrapper>
  );
};
