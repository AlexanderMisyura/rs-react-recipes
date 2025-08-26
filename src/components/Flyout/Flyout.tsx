import { BoxWrapper } from '@components';
import { clsx } from 'clsx';

interface FlyoutProps {
  children?: React.ReactNode;
  isOpen?: boolean;
}

export const Flyout: React.FC<FlyoutProps> = ({ children, isOpen }) => {
  return (
    <BoxWrapper className={clsx('flyout', isOpen && 'flyout__open')} testId={'flyout'}>
      {children}
    </BoxWrapper>
  );
};
