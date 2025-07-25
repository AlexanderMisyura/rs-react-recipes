import { Header } from '@components';
import { Outlet } from 'react-router';

export const App: React.FC = () => {
  return (
    <div className="flex w-full grow flex-col gap-4">
      <Header />

      <main className="flex grow flex-col items-center justify-center gap-4">
        <Outlet />
      </main>
    </div>
  );
};
