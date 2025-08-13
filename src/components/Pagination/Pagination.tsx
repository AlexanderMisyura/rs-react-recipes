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

  const followPage = (direction: -1 | 1) => {
    const params = new URLSearchParams(searchParams);
    let newPage = page + direction;

    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > pages) {
      newPage = pages;
    }

    params.set('page', newPage.toString());

    void navigate(`${UrlPath.RECIPES}?${params}`, { viewTransition: true });
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
        <img src={backIcon} className="h-6" alt="previous page" />
      </Button>

      <BoxWrapper className="text-xl font-bold text-orange-900">
        {page} / {pages}
      </BoxWrapper>

      <Button
        onClickHandler={() => {
          followPage(1);
        }}
        testId="pagination-next"
        disabled={page === pages}
      >
        <img src={forwardIcon} className="h-6" alt="next page" />
      </Button>
    </div>
  );
};
