import { UserModel } from '../models';
import { hashPassword } from '.';

export const createAdmin = async (
  email: string,
  password: string
): Promise<void> => {
  const passwordHash = await hashPassword(password);
  await UserModel.create({
    email,
    password: passwordHash,
    role: 'admin'
  });
};
