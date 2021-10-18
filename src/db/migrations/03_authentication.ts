import { DataTypes, QueryInterface } from 'sequelize';
import { createAdmin } from '../../utils';

const { STRING, INTEGER, DATE } = DataTypes;

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable('users', {
    id: {
      type: INTEGER,
      allowNull: false,
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
      type: DATE,
      allowNull: false
    },
    updatedAt: {
      type: DATE,
      allowNull: false
    }
  });

  await queryInterface.addColumn('snippets', 'createdBy', {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
  });

  await createAdmin('admin@local.com', 'snippet-admin');
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable('users');
  await queryInterface.removeColumn('snippets', 'createdBy');
};
