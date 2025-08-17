import logoIcon from '@assets/logo.png';
import { LocaleButton, NavLink, ThemeModeButton } from '@components';
import { UrlPath } from '@ts-enums';
import { BoxWrapper } from 'components/BoxWrapper/BoxWrapper';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const Header: React.FC = () => {
  const t = useTranslations('Header');

  return (
    <header className="sticky top-0 z-10 flex w-full justify-center">
      <BoxWrapper className="m-0 w-full flex-row flex-wrap justify-between gap-4 p-2 max-sm:justify-center">
        <NavLink
          className="transition-colors hover:text-orange-950"
          activeClassName="font-bold"
          href={UrlPath.RECIPES}
        >
          <div className="flex items-center gap-2 select-none">
            <Image width={48} height={48} src={logoIcon} alt={t('recipesAlt')} className="h-12" />
            <span
              style={{ fontWeight: 'inherit' }}
              className="text-2xl text-orange-900 transition-colors in-[a:hover]:text-orange-950"
            >
              {t('recipes')}
            </span>
          </div>
        </NavLink>
        <nav className="p-4 text-center">
          <ul>
            <li className="flex flex-col text-xl text-orange-900">
              <NavLink
                className="transition-colors hover:text-orange-950"
                activeClassName="font-bold"
                href={UrlPath.ABOUT}
              >
                {t('about')}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeModeButton />
          <LocaleButton />
        </div>
      </BoxWrapper>
    </header>
  );
};
