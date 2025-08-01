import { Header, Spinner } from '@components';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router';

function getFirstPathSegment(path: string) {
  const segments = path.split('/');
  return segments[1];
}

export const RootLayout: React.FC = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const { theme } = useThemeContext();

  const isNewPageLoading =
    navigation.state === 'loading' &&
    getFirstPathSegment(navigation.location.pathname) !== getFirstPathSegment(location.pathname);

  return (
    <>
      <title>Hot Recipes</title>
      <div className={clsx(`${theme}-layout`, 'flex w-full grow flex-col gap-4')}>
        <Header />

        <main className="flex grow flex-col items-center justify-center gap-4">
          {isNewPageLoading ? <Spinner /> : <Outlet />}
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
};
