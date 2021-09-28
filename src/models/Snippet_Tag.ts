import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import {
  Snippet_Tag,
  Snippet_TagCreationAttributes
} from '../typescript/interfaces';

const { INTEGER } = DataTypes;

export interface Snippet_TagInstance
  extends Model<Snippet_Tag, Snippet_TagCreationAttributes>,
    Snippet_Tag {}

export const Snippet_TagModel = sequelize.define<Snippet_TagInstance>(
  'Snippet_Tag',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    snippet_id: {
      type: INTEGER,
      allowNull: false
    },
    tag_id: {
      type: INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'snippets_tags'
  }
);
