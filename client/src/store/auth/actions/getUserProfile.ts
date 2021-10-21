import { User, UserWithRole, Response } from '../../../typescript/interfaces';
import React from 'react';
import axios from 'axios';
import { authErrorHandler } from '../../../utils';

interface Params {
  token: string;
  setIsAuthenticated: (v: React.SetStateAction<boolean>) => void;
  setUser: (v: React.SetStateAction<UserWithRole | null>) => void;
}

export const getUserProfile = async (params: Params) => {
  const { token, setIsAuthenticated, setUser } = params;

  try {
    const res = await axios.get<Response<User>>('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { ...user } = res.data.data;

    setUser({
      ...user,
      isAdmin: user.role === 'admin'
    });

    setIsAuthenticated(true);
  } catch (err) {
    authErrorHandler({ err, setIsAuthenticated, setUser });
  }
};
