import { Request } from 'express';

export interface UserInfoRequest<body = {}, params = {}>
  extends Request<params, {}, body> {
  user: {
    id: number;
    email: string;
    role: string;
    isAdmin: boolean;
  };
}
