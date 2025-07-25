import { BoxWrapper, Button, Heading } from '@components';

interface ErrorFallbackProps {
  error: Error;
  title?: string;
  resetFunction?: () => void;
  btnChildren?: React.ReactNode;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  title,
  resetFunction,
  btnChildren,
}) => {
  return (
    <BoxWrapper testId="error-fallback" className="max-w-2xl border-2 border-red-600">
      <Heading className="text-red-600">{title ?? 'Something went wrong'}</Heading>
      <p className="text-xl">{error.message}</p>
      {resetFunction && <Button onClickHandler={resetFunction}>{btnChildren ?? 'Fix'}</Button>}
    </BoxWrapper>
  );
};
