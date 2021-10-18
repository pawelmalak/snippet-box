import { useState, createContext, ReactNode } from 'react';

import { AuthContext as Context } from '../typescript/interfaces';

export const AuthContext = createContext<Context>({
  isAuthenticated: false,
  login: () => {}
});

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = (props: Props): JSX.Element => {
  const login = async (formData: { email: string; password: string }) => {
    console.table(formData);
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
