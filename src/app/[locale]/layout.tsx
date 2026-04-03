import '@styles/global.css';

import { Header, SelectionFlyout } from '@components';
import { routing } from '@i18n/routing';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { Provider } from './provider';

export const metadata: Metadata = {
  title: 'Hot Recipes',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="flex h-full grow flex-col items-center justify-center">
        <Provider>
          <NextIntlClientProvider>
            <div className={'flex w-full grow flex-col gap-4'}>
              <Header />

              <main className="flex grow flex-col items-center justify-center gap-4">
                {children}
              </main>
            </div>

            <SelectionFlyout />
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
