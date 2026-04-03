import { BoxWrapper, Button, Heading } from '@components';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('ErrorFallback');
  return (
    <BoxWrapper testId={testId ?? 'error-fallback'} className={'max-w-2xl border-2 border-red-600'}>
      <Heading className="text-red-600">{title ?? t('title')}</Heading>
      <p className="text-center text-xl text-balance">{error.message}</p>
      {resetFunction && <Button onClickHandler={resetFunction}>{btnChildren ?? t('fix')}</Button>}
      {children}
    </BoxWrapper>
  );
};
