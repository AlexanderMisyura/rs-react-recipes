'use client';

import { useThemeContext } from '@hooks';
import { usePathname, useRouter } from '@i18n/navigation';
import { routing } from '@i18n/routing';
import { clsx } from 'clsx';
import { useSearchParams } from 'next/navigation';
import { type Locale, useLocale } from 'next-intl';

export const LocaleButton: React.FC = () => {
  const { theme } = useThemeContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  const LOCALES_TOGGLE_MAP: Record<Locale, Locale> = {
    [routing.locales[0]]: routing.locales[1],
    [routing.locales[1]]: routing.locales[0],
  };

  const toggleLocale = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams ?? '');

    router.replace(`${pathname}?${params}`, { locale: LOCALES_TOGGLE_MAP[locale] });
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={clsx(
        'cursor-pointer rounded-md border-2 border-transparent p-2',
        `${theme}-theme-button`,
        'h-[52px] w-[52px] text-xl font-bold text-orange-900'
      )}
      title={`change ${locale} mode to ${LOCALES_TOGGLE_MAP[locale]}`}
    >
      {locale.toUpperCase()}
    </button>
  );
};
