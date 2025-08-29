import { useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface SearchProps {
  updateCountryFilter: (country: string) => void;
  country: string;
}

export const Search: React.FC<SearchProps> = ({ updateCountryFilter, country }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputRef.current?.value;

    if (value !== undefined && value !== country) {
      updateCountryFilter(value);
    }
  };

  const resetSearch = () => {
    updateCountryFilter('');

    if (inputRef.current === null) {
      return;
    }

    inputRef.current.value = '';
    inputRef.current.focus();
  };

  return (
    <form onSubmit={submitSearch} className="field has-addons">
      <p className="control has-icons-right">
        <input
          ref={inputRef}
          defaultValue={country}
          name="country"
          className="input"
          type="text"
          placeholder="Search country"
          autoComplete="off"
        />
        {country && (
          <span className="icon is-right pointer-events-auto!">
            <button className="z-50 cursor-pointer!" onClick={resetSearch} type="reset">
              <AiOutlineCloseCircle />
            </button>
          </span>
        )}
      </p>
      <p className="control">
        <button type="submit" className="button">
          Search
        </button>
      </p>
    </form>
  );
};
