import axios from 'axios';
import { createContext, ReactNode } from 'react';

import { AuthContext as Context, Response } from '../typescript/interfaces';
import { errorHandler } from '../utils';

export const AuthContext = createContext<Context>({
  isAuthenticated: false,
  login: () => {}
});

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = (props: Props): JSX.Element => {
  const login = async (formData: { email: string; password: string }) => {
    try {
      const res = await axios.post<Response<{ token: string }>>(
        '/api/auth/login',
        formData
      );

      localStorage.setItem('token', res.data.data.token);

      // get profile
      // redirect to snippets? / home?
    } catch (err) {
      errorHandler(err);
    }
  };

  const context: Context = {
    isAuthenticated: false,
    login
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
