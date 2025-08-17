import ChiliIcon from '@assets/chili.svg';
import { Heading } from '@components';

export const Spinner: React.FC = () => {
  return (
    <div>
      <div className="h-40 w-40 animate-spin">
        <ChiliIcon width={160} height={160} alt="chili pepper loading spinner" />
      </div>
      <Heading>Loading...</Heading>
    </div>
  );
};
