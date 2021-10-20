import { Request } from 'express';

export interface UserInfoRequest<body = {}> extends Request<{}, {}, body> {
  user: {
    id: number;
    email: string;
    role: string;
    isAdmin: boolean;
  };
}
