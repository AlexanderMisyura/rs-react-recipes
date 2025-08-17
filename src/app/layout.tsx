import '@styles/global.css';

import { Header, SelectionFlyout } from '@components';
import { recipesApi } from '@redux/apiRecipesSlice';
import { dispatch } from '@redux/store';
import type { Metadata } from 'next';

import { Provider } from './provider';

export const metadata: Metadata = {
  title: 'Hot Recipes',
};

interface RootLayoutProps {
  searchParams: Promise<{ q: string; page: string }>;
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  await dispatch(recipesApi.endpoints.getRecipes.initiate({}));

  return (
    <html lang="en">
      <body className="flex h-full grow flex-col items-center justify-center">
        <Provider>
          <>
            <div className={'flex w-full grow flex-col gap-4'}>
              <Header />

              <main className="flex grow flex-col items-center justify-center gap-4">
                {children}
              </main>
            </div>

            <SelectionFlyout />
          </>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
