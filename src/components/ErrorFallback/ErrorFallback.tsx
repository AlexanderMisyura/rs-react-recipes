import { BoxWrapper, Button, Heading } from '@components';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';

interface ErrorFallbackProps {
  error: Error;
  title?: string;
  resetFunction?: () => void;
  btnChildren?: React.ReactNode;
  testId?: string;
  children?: React.ReactNode;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  title,
  resetFunction,
  btnChildren,
  testId,
  children,
}) => {
  const { theme } = useThemeContext();

  return (
    <BoxWrapper
      testId={testId ?? 'error-fallback'}
      className={clsx(`${theme}-text`, 'max-w-2xl border-2 border-red-600')}
    >
      <Heading className="text-red-600">{title ?? 'Something went wrong'}</Heading>
      <p className="text-center text-xl text-balance">{error.message}</p>
      {resetFunction && <Button onClickHandler={resetFunction}>{btnChildren ?? 'Fix'}</Button>}
      {children}
    </BoxWrapper>
  );
};
