import chiliIcon from '@assets/chili.svg';
import { Heading } from '@components';

export const Spinner: React.FC = () => {
  return (
    <div>
      <div className="h-40 w-40 animate-spin">
        <img src={chiliIcon} alt="chili pepper loading spinner" />
      </div>
      <Heading>Loading...</Heading>
    </div>
  );
};
