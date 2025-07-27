import backIcon from '@assets/chevron-left.svg';
import forwardIcon from '@assets/chevron-right.svg';
import { BoxWrapper, Button } from '@components';
import config from '@config/api.config';
import { useLocation, useNavigation, useSearchParams } from 'react-router';

const { ITEMS_PER_PAGE } = config;

interface PaginationProps {
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const pages = Math.ceil(total / ITEMS_PER_PAGE);

  if (isLoading || pages === 1) {
    return null;
  }

  const prevParams = new URLSearchParams(searchParams);
  prevParams.set('page', String(page - 1));
  const nextParams = new URLSearchParams(searchParams);
  nextParams.set('page', String(page + 1));

  const prevPageLink = page > 1 ? `${location.pathname}?${prevParams.toString()}` : null;
  const nextPageLink = page < pages ? `${location.pathname}?${nextParams.toString()}` : null;

  return (
    <div className="my-4 flex items-center justify-center gap-4">
      <Button
        testId="pagination-previous"
        disabled={!prevPageLink}
        linkTo={prevPageLink ?? undefined}
      >
        <img src={backIcon} className="h-6" alt="" />
      </Button>

      <BoxWrapper className="text-xl font-bold text-orange-900">
        {page} / {pages}
      </BoxWrapper>

      <Button testId="pagination-next" disabled={!nextPageLink} linkTo={nextPageLink ?? undefined}>
        <img src={forwardIcon} className="h-6" alt="" />
      </Button>
    </div>
  );
};
