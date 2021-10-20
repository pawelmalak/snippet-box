import { User, Response, UserWithRole } from '../../../typescript/interfaces';
import { errorHandler } from '../../../utils';
import axios from 'axios';
import React from 'react';

interface Params {
  formData: {
    email: string;
    password: string;
  };
  setIsAuthenticated: (v: React.SetStateAction<boolean>) => void;
  setUser: (v: React.SetStateAction<UserWithRole | null>) => void;
}

export const loginUser = async (params: Params) => {
  const { formData, setIsAuthenticated, setUser } = params;

  try {
    const res = await axios.post<Response<{ token: string; user: User }>>(
      '/api/auth/login',
      formData
    );

    const { token: resToken, user: resUser } = res.data.data;

    setUser({
      ...resUser,
      isAdmin: resUser.role === 'admin'
    });

    localStorage.setItem('token', resToken);

    setIsAuthenticated(true);

    // redirect to snippets? / home?
  } catch (err) {
    errorHandler(err);
  }
};
