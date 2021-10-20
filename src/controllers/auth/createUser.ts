import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { UserInstance, UserModel } from '../../models';
import { hashPassword, signToken } from '../../utils';

interface RequestBody {
  email: string;
  password: string;
}

interface ResponseBody {
  data: {
    user: Omit<UserInstance, 'password'>;
    token: string;
  };
}

/**
 * @description Create new user
 * @route /api/auth
 * @request POST
 * @access Public
 */
export const createUser = asyncWrapper(
  async (
    req: Request<{}, {}, RequestBody>,
    res: Response<ResponseBody>,
    next: NextFunction
  ): Promise<void> => {
    const password = await hashPassword(req.body.password);

    await UserModel.create({
      ...req.body,
      password
    });

    const user = (await UserModel.findOne({
      where: { email: req.body.email },
      attributes: { exclude: ['password'] }
    })) as UserInstance;

    const token = signToken({ email: req.body.email });

    res.status(201).json({
      data: {
        user,
        token
      }
    });
  }
);
