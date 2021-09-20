import { DataTypes, Model } from 'sequelize';
import type { Migration } from '../';
import {
  Snippet,
  SnippetCreationAttributes
} from '../../typescript/interfaces';

const { INTEGER, STRING, DATE } = DataTypes;

export const up: Migration = async ({
  context: queryInterface
}): Promise<void> => {
  await queryInterface.createTable<Model<Snippet, SnippetCreationAttributes>>(
    'snippets',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true
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

export const down: Migration = async ({
  context: queryInterface
}): Promise<void> => {
  await queryInterface.dropTable('snippets');
};
