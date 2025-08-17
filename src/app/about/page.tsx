import GithubLogo from '@assets/github-logo.svg';
import RssLogo from '@assets/rss-logo.svg';
import { BoxWrapper, Heading } from '@components';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hot Recipes | About',
};

const AboutPage = () => {
  return (
    <BoxWrapper testId="about-page" className={'max-w-2xl text-center text-xl'}>
      <title>Hot Recipes | About</title>
      <div className="flex flex-col items-center gap-5">
        <Heading className="text-pretty">About me and this project</Heading>
        <section className="flex flex-col items-center gap-2">
          <p>Hello! My name is Alexander</p>
          <p>Coding and developing beautiful, smooth apps 💻✨</p>
        </section>
        <section className="flex flex-col items-center gap-2">
          <p>My github profile: </p>
          <p>
            <Link
              className="inline-flex items-center gap-4 align-middle font-bold text-orange-900 transition-colors hover:text-orange-950"
              href="https://github.com/AlexanderMisyura"
              target="_blanc"
            >
              <GithubLogo width={32} height={32} className="h-6" alt="github logo" />{' '}
              AlexanderMisyura
            </Link>
          </p>
          <p>This project is a part of the</p>
          <p>
            <Link
              className="inline-flex items-center gap-4 align-middle font-bold text-orange-900 transition-colors hover:text-orange-950"
              href="https://rs.school/courses/reactjs"
              target="_blanc"
            >
              <RssLogo width={32} height={32} className="h-6" alt="rolling scopes school logo" /> RS
              School React course
            </Link>
          </p>
        </section>
      </div>
    </BoxWrapper>
  );
};

export default AboutPage;
