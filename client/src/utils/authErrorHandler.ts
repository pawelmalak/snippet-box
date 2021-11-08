import { errorHandler } from '.';
import { UserWithRole } from '../typescript/interfaces';

interface Params {
  err: any;
  setIsAuthenticated: (v: React.SetStateAction<boolean>) => void;
  setUser: (v: React.SetStateAction<UserWithRole | null>) => void;
}

export const authErrorHandler = (params: Params) => {
  const { err, setUser, setIsAuthenticated } = params;

  errorHandler(err);

  localStorage.removeItem('token');

  setUser(null);

  setIsAuthenticated(false);
};
