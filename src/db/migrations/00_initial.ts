import { DataTypes, Model, QueryInterface } from 'sequelize';
import {
  Snippet,
  SnippetCreationAttributes
} from '../../typescript/interfaces';

const { INTEGER, STRING, DATE } = DataTypes;

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable<Model<Snippet, SnippetCreationAttributes>>(
    'snippets',
    {
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
      language: {
        type: STRING,
        allowNull: false
      },
      createdAt: {
        type: DATE,
        allowNull: false
      },
      updatedAt: {
        type: DATE,
        allowNull: false
      }
    }
  );
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable('snippets');
};
