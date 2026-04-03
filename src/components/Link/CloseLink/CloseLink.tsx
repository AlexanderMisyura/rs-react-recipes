'use client';

import { Button } from '@components';
import { UrlPath } from '@ts-enums';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface CloseLinkProps {
  className?: string;
  text?: string;
}

export const CloseLink: React.FC<CloseLinkProps> = ({ className, text }) => {
  const t = useTranslations('CloseLink');
  const searchParams = useSearchParams();
  const closeDetailsUrl = `${UrlPath.RECIPES}?${searchParams.toString()}`;

  return (
    <Button className={className} linkTo={closeDetailsUrl}>
      {text ?? t('text')}
    </Button>
  );
};
