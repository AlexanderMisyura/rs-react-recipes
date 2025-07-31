import d20OneIcon from '@assets/d20-one.svg';
import d20TwentyIcon from '@assets/d20-twenty.svg';
import githubLogo from '@assets/github-logo.svg';
import rssLogo from '@assets/rss-logo.svg';
import { BoxWrapper, Heading } from '@components';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';
import { Link } from 'react-router';

export const AboutPage = () => {
  const { theme } = useThemeContext();

  return (
    <BoxWrapper
      testId="about-page"
      className={clsx(`${theme}-text`, 'max-w-2xl text-center text-xl')}
    >
      <title>Hot Recipes | About</title>
      <div className="flex flex-col items-center gap-5">
        <Heading className="text-pretty">About me and this project</Heading>
        <section className="flex flex-col items-center gap-2">
          <p>Hello! My name is Alexander</p>
          <p>Coding and developing beautiful, smooth apps 💻✨</p>
          <div className="inline-flex items-center gap-2 align-middle">
            <img src={d20TwentyIcon} className="h-10" alt="d20 die with 20 on it" />
            <p>
              Developer by day,{' '}
              <Link to="https://www.dndbeyond.com/classes/2190881-paladin" target="_blanc">
                paladin
              </Link>{' '}
              of the 🌞 Sun God by night!
            </p>
            <img src={d20OneIcon} className="h-10" alt="d20 die with 1 on it" />
          </div>
        </section>
        <section className="flex flex-col items-center gap-2">
          <p>My github profile: </p>
          <p>
            <Link
              className="inline-flex items-center gap-4 align-middle font-bold text-orange-900 transition-colors hover:text-orange-950"
              to="https://github.com/AlexanderMisyura"
              target="_blanc"
            >
              <img src={githubLogo} className="h-6" alt="github logo" /> AlexanderMisyura
            </Link>
          </p>
          <p>This project is a part of the</p>
          <p>
            <Link
              className="inline-flex items-center gap-4 align-middle font-bold text-orange-900 transition-colors hover:text-orange-950"
              to="https://rs.school/courses/reactjs"
              target="_blanc"
            >
              <img src={rssLogo} className="h-6" alt="rolling scopes school logo" /> RS School React
              course
            </Link>
          </p>
        </section>
      </div>
    </BoxWrapper>
  );
};
