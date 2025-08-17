'use client';

import { Button } from '@components';
import { UrlPath } from '@ts-enums';
import { useSearchParams } from 'next/navigation';

interface CloseLinkProps {
  className?: string;
  text?: string;
}

export const CloseLink: React.FC<CloseLinkProps> = ({ className, text = 'Close' }) => {
  const searchParams = useSearchParams();
  const closeDetailsUrl = `${UrlPath.RECIPES}?${searchParams?.toString()}`;

  return (
    <Button className={className} linkTo={closeDetailsUrl}>
      {text}
    </Button>
  );
};
