import { Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { UserInstance, UserModel } from '../../models';
import { UserInfoRequest } from '../../typescript/interfaces';

interface RequestBody {}

interface ResponseBody {
  data: Omit<UserInstance, 'password'>;
}

/**
 * @description Get user profile by token
 * @route /api/auth/me
 * @request POST
 * @access Public
 */
export const getProfile = asyncWrapper(
  async (
    req: UserInfoRequest<RequestBody>,
    res: Response<ResponseBody>,
    next: NextFunction
  ): Promise<void> => {
    const user = (await UserModel.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] },
      raw: true
    })) as UserInstance;

    res.status(200).json({
      data: user
    });
  }
);
