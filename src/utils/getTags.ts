import { sequelize } from '../db';
import { QueryTypes } from 'sequelize';

export const getTags = async (snippetId: number): Promise<string[]> => {
  const tags = await sequelize.query<{ name: string }>(
    `SELECT tags.name
    FROM tags
    INNER JOIN
      snippets_tags ON tags.id = snippets_tags.tag_id
    INNER JOIN
      snippets ON snippets.id = snippets_tags.snippet_id
    WHERE 
      snippets_tags.snippet_id = ${snippetId};`,
    { type: QueryTypes.SELECT }
  );

  return tags.map(tag => tag.name);
};
