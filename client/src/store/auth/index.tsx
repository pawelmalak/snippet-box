import { createContext, ReactNode, useState } from 'react';
import axios from 'axios';

import { loginUser, logoutUser, registerUser } from './actions';

import {
  AuthContext as Context,
  Response,
  User,
  UserWithRole
} from '../../typescript/interfaces';
import { errorHandler } from '../../utils';

export const AuthContext = createContext<Context>({
  isAuthenticated: false,
  user: null,
  autoLogin: () => {},
  login: () => {},
  logout: () => {},
  register: () => {}
});

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
    try {
      const res = await axios.get<Response<User>>('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(res.data.data);
    } catch (err) {
      errorHandler(err);
    }
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
