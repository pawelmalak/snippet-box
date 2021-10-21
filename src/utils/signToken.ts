import { sign } from 'jsonwebtoken';
import { Token } from '../typescript/interfaces';

export const signToken = (data: Token): string => {
  const secret = process.env.JWT_SECRET || 'secret';

  const token = sign(data, secret, {
    expiresIn: '14d'
  });

  return token;
};
