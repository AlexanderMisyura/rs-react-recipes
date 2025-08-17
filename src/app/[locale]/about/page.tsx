import GithubLogo from '@assets/github-logo.svg';
import RssLogo from '@assets/rss-logo.svg';
import { BoxWrapper, Heading } from '@components';
import { Link } from '@i18n/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Hot Recipes | About',
};

const AboutPage = async () => {
  const t = await getTranslations('AboutPage');

  return (
    <BoxWrapper testId="about-page" className={'max-w-2xl text-center text-xl'}>
      <div className="flex flex-col items-center gap-5">
        <Heading className="text-pretty">{t('aboutMe')}</Heading>
        <section className="flex flex-col items-center gap-2">
          <p>{t('hello')}</p>
        </section>
        <section className="flex flex-col items-center gap-2">
          <p>{t('github')}</p>
          <p>
            <Link
              className="inline-flex items-center gap-4 align-middle font-bold text-orange-900 transition-colors hover:text-orange-950"
              href="https://github.com/AlexanderMisyura"
              target="_blanc"
            >
              <GithubLogo width={32} height={32} className="h-6" alt="github logo" />
              AlexanderMisyura
            </Link>
          </p>
          <p>{t('project')}</p>
          <p>
            <Link
              className="inline-flex items-center gap-4 align-middle font-bold text-orange-900 transition-colors hover:text-orange-950"
              href="https://rs.school/courses/reactjs"
              target="_blanc"
            >
              <RssLogo width={32} height={32} className="h-6" alt="rolling scopes school logo" />
              {t('rsSchool')}
            </Link>
          </p>
        </section>
      </div>
    </BoxWrapper>
  );
};

export default AboutPage;
