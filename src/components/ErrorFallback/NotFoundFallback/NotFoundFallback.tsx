import { BoxWrapper, Button, Heading } from '@components';
import { UrlPath } from '@ts-enums';
import { useTranslations } from 'next-intl';

export const NotFoundFallback: React.FC = () => {
  const t = useTranslations('NotFoundFallback');

  return (
    <BoxWrapper className="max-w-2xl border-2 border-red-600">
      <Heading className="text-red-600">{t('title')}</Heading>
      <p className="text-xl">{t('description')}</p>
      <Button linkTo={UrlPath.RECIPES}>{t('toRecipes')}</Button>
    </BoxWrapper>
  );
};
