import { DataTypes, QueryInterface } from 'sequelize';
const { INTEGER, STRING, DATE, TEXT } = DataTypes;

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable('snippets', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: STRING,
      allowNull: false
    },
    description: {
      type: TEXT,
      allowNull: true,
      defaultValue: ''
    },
    language: {
      type: STRING,
      allowNull: false
    },
    code: {
      type: TEXT,
      allowNull: false
    },
    docs: {
      type: TEXT,
      allowNull: true,
      defaultValue: ''
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
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable('snippets');
};
