import { NavLink } from 'react-router-dom';
import { Route } from '../../typescript/interfaces';
import { routes as clientRoutes } from './routes.json';
import { useContext } from 'react';
import { AuthContext } from '../../store';

export const Navbar = (): JSX.Element => {
  const routes = clientRoutes as Route[];
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className='navbar navbar-dark bg-dark navbar-expand'>
      <div className='container-fluid'>
        <ul className='navbar-nav'>
          {isAuthenticated
            ? routes
                .filter(r => !r.hideFromAuthenticated)
                .map((route, idx) => (
                  <li className='nav-item' key={idx}>
                    <NavLink exact to={route.dest} className='nav-link'>
                      {route.name}
                    </NavLink>
                  </li>
                ))
            : routes
                .filter(r => !r.requiresAuthentication)
                .map((route, idx) => (
                  <li className='nav-item' key={idx}>
                    <NavLink exact to={route.dest} className='nav-link'>
                      {route.name}
                    </NavLink>
                  </li>
                ))}
        </ul>
      </div>
    </nav>
  );
};
