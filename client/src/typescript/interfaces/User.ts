import { Model } from '.';

export interface User extends Model {
  email: string;
  role: string;
}

export interface UserWithRole extends Model {
  isAdmin: boolean;
}
