import { Model } from '.';
import { Optional } from 'sequelize';

export interface User extends Model {
  email: string;
  password: string;
  role: string;
}

export interface UserCreationAttributes
  extends Optional<User, 'id' | 'createdAt' | 'updatedAt' | 'role'> {}
