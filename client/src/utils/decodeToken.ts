import jwt_decode from 'jwt-decode';
import { Token } from '../typescript/interfaces';

export const decodeToken = (token: string): Token => {
  const decoded: Token = jwt_decode(token);
  return decoded;
};
