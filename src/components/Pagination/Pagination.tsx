'use client';

import BackIcon from '@assets/chevron-left.svg';
import ForwardIcon from '@assets/chevron-right.svg';
import { BoxWrapper, Button } from '@components';
import config from '@config/api.config';
import { useRouter } from '@i18n/navigation';
import { UrlPath } from '@ts-enums';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const { ITEMS_PER_PAGE } = config;

interface PaginationProps {
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const t = useTranslations('Pagination');
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = +(searchParams?.get('page') ?? '1');
  const pages = Math.ceil(total / ITEMS_PER_PAGE);

  const followPage = (direction: -1 | 1) => {
    const params = new URLSearchParams(searchParams ?? '');
    let newPage = page + direction;

    if (newPage < 1) {
      newPage = 1;
    }

    if (newPage > pages) {
      newPage = pages;
    }

    params.set('page', newPage.toString());

    router.push(`${UrlPath.RECIPES}?${params}`);
  };

  if (pages === 1) {
    return null;
  }

  return (
    <div className="my-4 flex items-center justify-center gap-4">
      <Button
        onClickHandler={() => {
          followPage(-1);
        }}
        testId="pagination-previous"
        disabled={page === 1}
      >
        <BackIcon width={32} height={32} className="h-6" alt={t('previous')} />
      </Button>

      <BoxWrapper className="text-xl font-bold text-orange-900!">
        {page} / {pages}
      </BoxWrapper>

      <Button
        onClickHandler={() => {
          followPage(1);
        }}
        testId="pagination-next"
        disabled={page === pages}
      >
        <ForwardIcon width={32} height={32} className="h-6" alt={t('next')} />
      </Button>
    </div>
  );
};
