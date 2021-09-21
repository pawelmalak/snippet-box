import { Model } from '.';
import { Optional } from 'sequelize';

export interface Snippet extends Model {
  title: string;
  description: string;
  language: string;
  code: string;
  docs: string;
}

export interface SnippetCreationAttributes
  extends Optional<Snippet, 'id' | 'createdAt' | 'updatedAt'> {}
