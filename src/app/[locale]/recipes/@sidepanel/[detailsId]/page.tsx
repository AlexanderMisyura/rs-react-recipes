import { BoxWrapper, CloseLink, SidePanelErrorFallback } from '@components';
import { recipesApi } from '@redux/apiRecipesSlice';
import { dispatch } from '@redux/store';
import { getTranslations } from 'next-intl/server';

interface SidePanelProps {
  params: Promise<{ detailsId?: string }>;
}

const SidePanel: React.FC<SidePanelProps> = async ({ params }) => {
  const { detailsId } = await params;
  const t = await getTranslations('SidePanel');

  if (!detailsId) {
    return null;
  }

  const detailsPromise = dispatch(recipesApi.endpoints.getRecipeDetails.initiate(detailsId));

  try {
    const { data, isError, error } = await detailsPromise;

    if (isError) {
      return <SidePanelErrorFallback error={error} />;
    }

    if (data) {
      return (
        <BoxWrapper testId="side-panel" className={'flex w-full max-w-2xl flex-col gap-4'}>
          <h3 className="text-center font-bold text-balance text-orange-900">
            {`${t('title')} ${data.name}`}
          </h3>

          <ul className="flex list-disc flex-col gap-1 pl-6 text-sm">
            {data.instructions.map((instruction) => {
              return (
                <li data-testid="instruction" key={instruction}>
                  {instruction}
                </li>
              );
            })}
          </ul>

          <CloseLink className="w-full" />
        </BoxWrapper>
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return <SidePanelErrorFallback error={error} />;
    }
  } finally {
    detailsPromise.unsubscribe();
  }
};

export default SidePanel;
