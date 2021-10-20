import { Router } from 'express';
import { createUser, getProfile, loginUser } from '../controllers/auth';
import { authenticate, requireBody } from '../middleware';

export const authRouter = Router();

authRouter
  .route('/register')
  .post(requireBody('email', 'password'), createUser);

authRouter.route('/login').post(requireBody('email', 'password'), loginUser);

authRouter.route('/me').get(authenticate, getProfile);
