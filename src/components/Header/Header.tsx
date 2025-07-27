import logo from '@assets/logo.png';
import { UrlPath } from '@ts-enums';
import { BoxWrapper } from 'components/BoxWrapper/BoxWrapper';
import { NavLink } from 'react-router';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-full justify-center">
      <BoxWrapper className="m-0 w-full flex-row flex-wrap justify-between gap-4 p-2 max-sm:justify-center">
        <NavLink
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'inherit',
          })}
          to={UrlPath.RECIPES}
        >
          <div className="flex items-center gap-2 select-none">
            <img src={logo} alt="logo" className="h-12" />
            <span style={{ fontWeight: 'inherit' }} className="text-2xl text-orange-900">
              Hot Recipes
            </span>
          </div>
        </NavLink>
        <nav className="p-4 text-center">
          <ul>
            <li className="flex flex-col text-xl text-orange-900">
              <NavLink
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
