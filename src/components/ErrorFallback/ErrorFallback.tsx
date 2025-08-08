import { BoxWrapper, Button, Heading } from '@components';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';

interface ErrorFallbackProps {
  error: Error;
  title?: string;
  resetFunction?: () => void;
  btnChildren?: React.ReactNode;
  testId?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  title,
  resetFunction,
  btnChildren,
  testId,
}) => {
  const { theme } = useThemeContext();

  return (
    <BoxWrapper
      testId={testId ?? 'error-fallback'}
      className={clsx(`${theme}-text`, 'max-w-2xl border-2 border-red-600')}
    >
      <Heading className="text-red-600">{title ?? 'Something went wrong'}</Heading>
      <p className="text-xl">{error.message}</p>
      {resetFunction && <Button onClickHandler={resetFunction}>{btnChildren ?? 'Fix'}</Button>}
    </BoxWrapper>
  );
};
