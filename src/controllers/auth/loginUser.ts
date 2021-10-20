import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { UserInstance, UserModel } from '../../models';
import { ErrorResponse, signToken } from '../../utils';
import { compare } from 'bcrypt';

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
 * @description User login
 * @route /api/auth/login
 * @request POST
 * @access Public
 */
export const loginUser = asyncWrapper(
  async (
    req: Request<{}, {}, RequestBody>,
    res: Response<ResponseBody>,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    // Find user
    let user = await UserModel.findOne({ where: { email }, raw: true });

    if (user) {
      // Check password
      const passwordMatch = await compare(password, user.password);

      if (passwordMatch) {
        // Sign token
        const token = await signToken({ email });

        user = (await UserModel.findOne({
          where: { email },
          attributes: { exclude: ['password'] },
          raw: true
        })) as UserInstance;

        res.status(200).json({
          data: { token, user }
        });
      } else {
        return next(new ErrorResponse(400, 'Invalid credentials'));
      }
    } else {
      return next(new ErrorResponse(400, 'Invalid credentials'));
    }
  }
);
