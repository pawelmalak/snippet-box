import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { Snippet, SnippetCreationAttributes } from '../typescript/interfaces';

const { INTEGER, STRING, DATE, TEXT } = DataTypes;

export interface SnippetInstance
  extends Model<Snippet, SnippetCreationAttributes>,
    Snippet {}

export const SnippetModel = sequelize.define<SnippetInstance>(
  'Snippet',
  {
    id: {
      type: INTEGER,
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
    isPinned: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    createdAt: {
      type: DATE
    },
    updatedAt: {
      type: DATE
    }
  },
  {
    tableName: 'snippets'
  }
);
