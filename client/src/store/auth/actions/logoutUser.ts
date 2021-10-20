import { UserWithRole } from '../../../typescript/interfaces';
import React from 'react';

interface Params {
  setIsAuthenticated: (v: React.SetStateAction<boolean>) => void;
  setUser: (v: React.SetStateAction<UserWithRole | null>) => void;
}

export const logoutUser = (params: Params) => {
  const { setIsAuthenticated, setUser } = params;

  localStorage.removeItem('token');

  setUser(null);

  setIsAuthenticated(false);
};
