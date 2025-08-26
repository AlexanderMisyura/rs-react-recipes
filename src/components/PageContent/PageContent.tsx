'use client';

import { BoxWrapper, ErrorFallback, Heading, List, Pagination, Spinner } from '@components';
import { useRouter } from '@i18n/navigation';
import { useGetRecipesQuery } from '@redux/apiRecipesSlice';
import { getRecipesFetchParams } from '@utils';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PageContentProps {
  sidePanel: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ sidePanel }) => {
  const t = useTranslations('RecipesLayout');
  const searchParams = useSearchParams();

  const recipesParams = getRecipesFetchParams(new URLSearchParams(searchParams));
  const { data: recipesData, isFetching, isError, error } = useGetRecipesQuery(recipesParams);
  const params = useParams<{ detailsId?: string }>();
  const router = useRouter();

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <ErrorFallback
        title={'status' in error ? error.status.toString() : t('error')}
        error={
          new Error(
            'data' in error
              ? String((error.data as { message: string }).message)
              : t('fallbackMessage')
          )
        }
        btnChildren="Back"
        resetFunction={() => {
          router.back();
        }}
      />
    );
  }

  if (recipesData) {
    return recipesData.recipes.length ? (
      <>
        <List recipesData={recipesData} sidePanel={params.detailsId ? sidePanel : null} />
        <Pagination total={recipesData.total} />
      </>
    ) : (
      <BoxWrapper testId="empty-fallback" className="border-2 border-orange-900">
        <Heading>{t('emptyFallback')}</Heading>
        <p className="text-xl">{t('emptyFallbackText')}</p>
      </BoxWrapper>
    );
  }
};
