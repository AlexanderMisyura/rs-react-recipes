import backIcon from '@assets/chevron-left.svg';
import forwardIcon from '@assets/chevron-right.svg';
import { BoxWrapper, Button } from '@components';
import config from '@config/api.config';
import { UrlPath } from '@ts-enums';
import { useSearchParams } from 'react-router';

const { ITEMS_PER_PAGE } = config;

interface PaginationProps {
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const [searchParams] = useSearchParams();

  const page = +(searchParams.get('page') ?? '1');
  const pages = Math.ceil(total / ITEMS_PER_PAGE);

  const prevParams = new URLSearchParams(searchParams);
  prevParams.set('page', String(page - 1));
  const nextParams = new URLSearchParams(searchParams);
  nextParams.set('page', String(page + 1));

  const prevPageLink = page > 1 ? `${UrlPath.RECIPES}?${prevParams.toString()}` : null;
  const nextPageLink = page < pages ? `${UrlPath.RECIPES}?${nextParams.toString()}` : null;

  if (pages === 1) {
    return null;
  }

  return (
    <div className="my-4 flex items-center justify-center gap-4">
      <Button
        testId="pagination-previous"
        disabled={!prevPageLink}
        linkTo={prevPageLink ?? undefined}
      >
        <img src={backIcon} className="h-6" alt="previous page" />
      </Button>

      <BoxWrapper className="text-xl font-bold text-orange-900">
        {page} / {pages}
      </BoxWrapper>

      <Button testId="pagination-next" disabled={!nextPageLink} linkTo={nextPageLink ?? undefined}>
        <img src={forwardIcon} className="h-6" alt="next page" />
      </Button>
    </div>
  );
};
