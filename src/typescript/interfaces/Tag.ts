import { Optional } from 'sequelize';

export interface Tag {
  id: number;
  name: string;
}

export interface TagCreationAttributes extends Optional<Tag, 'id'> {}
