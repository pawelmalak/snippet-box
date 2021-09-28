import { sequelize } from '../db';
import { QueryTypes } from 'sequelize';
import { TagModel, Snippet_TagModel } from '../models';

export const createTags = async (
  parsedTags: Set<string>,
  snippetId: number
): Promise<void> => {
  // Get all tags
  const rawAllTags = await sequelize.query<{ id: number; name: string }>(
    `SELECT * FROM tags`,
    { type: QueryTypes.SELECT }
  );

  const parsedAllTags = rawAllTags.map(tag => tag.name);

  // Create array of new tags
  const newTags = [...parsedTags].filter(tag => !parsedAllTags.includes(tag));

  // Create new tags
  if (newTags.length > 0) {
    for (const tag of newTags) {
      const { id, name } = await TagModel.create({ name: tag });
      rawAllTags.push({ id, name });
    }
  }

  // Associate tags with snippet
  for (const tag of parsedTags) {
    const tagObj = rawAllTags.find(t => t.name == tag);

    if (tagObj) {
      await Snippet_TagModel.create({
        snippet_id: snippetId,
        tag_id: tagObj.id
      });
    }
  }
};
