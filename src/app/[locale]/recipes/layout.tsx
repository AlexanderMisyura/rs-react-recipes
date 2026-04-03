import { PageContent, Search } from '@components';

interface RecipesLayoutProps {
  children: React.ReactNode;
  sidepanel: React.ReactNode;
}

const RecipesLayout: React.FC<RecipesLayoutProps> = ({ sidepanel }) => {
  return (
    <>
      <Search />

      <div
        data-testid="main-page"
        className="flex w-full grow flex-col items-center justify-center gap-4"
      >
        <PageContent sidePanel={sidepanel} />
      </div>
    </>
  );
};

export default RecipesLayout;
