import { Optional } from 'sequelize';

export interface Snippet_Tag {
  id: number;
  snippet_id: number;
  tag_id: number;
}

export interface Snippet_TagCreationAttributes
  extends Optional<Snippet_Tag, 'id'> {}
