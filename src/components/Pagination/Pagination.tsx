import backIcon from '@assets/chevron-left.svg';
import forwardIcon from '@assets/chevron-right.svg';
import { BoxWrapper, Button } from '@components';
import config from '@config/api.config';
import { UrlPath } from '@ts-enums';
import { useNavigate, useSearchParams } from 'react-router';

const { ITEMS_PER_PAGE } = config;

interface PaginationProps {
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = +(searchParams.get('page') ?? '1');
  const pages = Math.ceil(total / ITEMS_PER_PAGE);

  const followBack = () => {
    const prevParams = new URLSearchParams(searchParams);
    prevParams.set('page', (page - 1 > 0 ? page - 1 : 1).toString());
    const prevPageLink = `${UrlPath.RECIPES}?${prevParams.toString()}`;

    void navigate(prevPageLink);
  };

  const followForward = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', (page + 1 > pages ? pages : page + 1).toString());
    const prevPageLink = `${UrlPath.RECIPES}?${nextParams.toString()}`;

    void navigate(prevPageLink);
  };

  if (pages === 1) {
    return null;
  }

  return (
    <div className="my-4 flex items-center justify-center gap-4">
      <Button onClickHandler={followBack} testId="pagination-previous" disabled={page === 1}>
        <img src={backIcon} className="h-6" alt="previous page" />
      </Button>

      <BoxWrapper className="text-xl font-bold text-orange-900">
        {page} / {pages}
      </BoxWrapper>

      <Button onClickHandler={followForward} testId="pagination-next" disabled={page === pages}>
        <img src={forwardIcon} className="h-6" alt="next page" />
      </Button>
    </div>
  );
};
