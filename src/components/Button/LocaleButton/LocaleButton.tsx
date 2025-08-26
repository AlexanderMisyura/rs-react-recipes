'use client';

import { usePathname, useRouter } from '@i18n/navigation';
import { routing } from '@i18n/routing';
import { useSearchParams } from 'next/navigation';
import { type Locale, useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export const LocaleButton: React.FC = () => {
  const t = useTranslations('LocaleButton');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  const LOCALES_TOGGLE_MAP: Record<Locale, Locale> = {
    [routing.locales[0]]: routing.locales[1],
    [routing.locales[1]]: routing.locales[0],
  };

  const toggleLocale = () => {
    router.replace(`${pathname}?${searchParams.toString()}`, {
      locale: LOCALES_TOGGLE_MAP[locale],
    });
  };

  return (
    <button type="button" onClick={toggleLocale} className="toggle-button" title={t('changeTitle')}>
      {locale.toUpperCase()}
    </button>
  );
};
