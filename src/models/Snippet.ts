import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { Snippet, SnippetCreationAttributes } from '../typescript/interfaces';

const { INTEGER, STRING, DATE } = DataTypes;

interface SnippetInstance
  extends Model<Snippet, SnippetCreationAttributes>,
    Snippet {}

export const SnippetModel = sequelize.define<SnippetInstance>('Snippet', {
  id: {
    type: INTEGER,
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
    type: DATE
  },
  updatedAt: {
    type: DATE
  }
});
