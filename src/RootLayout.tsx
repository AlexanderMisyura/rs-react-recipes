import { Header } from '@components';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';
import { Outlet, ScrollRestoration } from 'react-router';

export const RootLayout: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <title>Hot Recipes</title>
      <div className={clsx(`${theme}-layout`, 'flex w-full grow flex-col gap-4')}>
        <Header />

        <main className="flex grow flex-col items-center justify-center gap-4">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
};
