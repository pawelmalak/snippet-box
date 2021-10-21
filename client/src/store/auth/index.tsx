import { ReactNode, useState } from 'react';
import { AuthContext } from '..';

import { getUserProfile, loginUser, logoutUser, registerUser } from './actions';

import {
  AuthContext as Context,
  UserWithRole
} from '../../typescript/interfaces';

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = (props: Props): JSX.Element => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const autoLogin = async () => {
    if (localStorage.token) {
      await getProfile(localStorage.token);
    }
  };

  const login = async (formData: { email: string; password: string }) => {
    await loginUser({ formData, setIsAuthenticated, setUser });
  };

  const logout = () => {
    logoutUser({ setIsAuthenticated, setUser });
  };

  const register = async (formData: { email: string; password: string }) => {
    await registerUser({ formData, setIsAuthenticated, setUser });
  };

  const getProfile = async (token: string) => {
    await getUserProfile({ token, setIsAuthenticated, setUser });
  };

  const context: Context = {
    isAuthenticated,
    user,
    autoLogin,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
