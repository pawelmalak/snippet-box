import { NextFunction, Response } from 'express';
import { asyncWrapper } from '.';
import { ErrorResponse } from '../utils';
import { verify } from 'jsonwebtoken';
import { Token, UserInfoRequest } from '../typescript/interfaces';
import { UserModel } from '../models';

interface Query {
  token?: string;
}

export const authenticate = asyncWrapper(
  async (
    req: UserInfoRequest<{}, {}, Query>,
    res: Response,
    next: NextFunction
  ) => {
    let token: string | null = null;

    // Check if token was provided
    if (req.headers.authorization) {
      if (req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      }
    } else if (req.query.token) {
      token = req.query.token;
    }

    if (token) {
      const secret = process.env.JWT_SECRET || 'secret';

      // Decode token and extract data
      const decoded = verify(token, secret) as Token;

      // Find user
      const user = await UserModel.findOne({
        where: { email: decoded.email },
        attributes: { exclude: ['password'] },
        raw: true
      });

      if (user) {
        req.user = {
          ...user,
          isAdmin: user.role == 'admin'
        };

        next();
      } else {
        return next(new ErrorResponse(401, 'Not authorized'));
      }
    } else {
      return next(new ErrorResponse(401, 'Not authorized'));
    }
  }
);
