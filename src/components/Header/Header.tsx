import logo from '@assets/logo.png';
import { UrlPath } from '@ts-enums';
import { BoxWrapper } from 'components/BoxWrapper/BoxWrapper';
import { NavLink } from 'react-router';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex w-full justify-center">
      <BoxWrapper className="m-0 w-full flex-row flex-wrap justify-between gap-4 p-2 max-sm:justify-center">
        <NavLink
          className="transition-colors hover:text-orange-950"
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'inherit',
          })}
          to={UrlPath.RECIPES}
        >
          <div className="flex items-center gap-2 select-none">
            <img src={logo} alt="Hot Recipes logo" className="h-12" />
            <span
              style={{ fontWeight: 'inherit' }}
              className="text-2xl text-orange-900 transition-colors in-[a:hover]:text-orange-950"
            >
              Hot Recipes
            </span>
          </div>
        </NavLink>
        <nav className="p-4 text-center">
          <ul>
            <li className="flex flex-col text-xl text-orange-900">
              <NavLink
                className="transition-colors hover:text-orange-950"
                to={UrlPath.ABOUT}
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'inherit',
                })}
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </BoxWrapper>
    </header>
  );
};
