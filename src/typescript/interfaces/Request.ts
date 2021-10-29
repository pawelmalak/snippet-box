import { Request } from 'express';

export interface UserInfoRequest<body = {}, params = {}, query = {}>
  extends Request<params, {}, body, query> {
  user: {
    id: number;
    email: string;
    role: string;
    isAdmin: boolean;
  };
}
