import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { User, UserCreationAttributes } from '../typescript/interfaces';

const { INTEGER, STRING, DATE } = DataTypes;

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {}

export const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING,
      allowNull: false
    },
    role: {
      type: STRING,
      allowNull: true,
      defaultValue: 'user'
    },
    createdAt: {
      type: DATE
    },
    updatedAt: {
      type: DATE
    }
  },
  {
    tableName: 'users'
  }
);
