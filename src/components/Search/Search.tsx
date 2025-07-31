import searchIcon from '@assets/search.svg';
import { BoxWrapper, Button } from '@components';
import { useLocalStorageParamSync } from '@hooks';
import { searchFormDataSchema } from '@schemas';
import { Form, useNavigation, useSubmit } from 'react-router';

export const Search: React.FC = () => {
  const [searchString, setSearchString] = useLocalStorageParamSync('searchString');
  const navigation = useNavigation();
  const submit = useSubmit();

  const loading = navigation.state === 'loading';

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

    void submit(submission);
  };

  return (
    <BoxWrapper className="mx-2 flex">
      <Form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          name="q"
          defaultValue={searchString}
          className="rounded-md border-2 border-sky-200 bg-gray-50 px-4 py-2 hover:border-sky-300"
          type="search"
          placeholder="Search"
          disabled={loading}
        />
        <Button testId="search-button" type="submit" disabled={loading}>
          <img src={searchIcon} className="h-6" alt="search submit" />
        </Button>
      </Form>
    </BoxWrapper>
  );
};
