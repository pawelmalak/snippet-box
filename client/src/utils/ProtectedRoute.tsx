import { Redirect, Route, RouteProps } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../store';

// interface Props extends RouteProps {}

export const ProtectedRoute = ({ ...rest }: RouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Route {...rest} />;
  } else {
    return <Redirect to='/auth' />;
  }
};
