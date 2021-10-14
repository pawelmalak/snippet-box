import { TagModel, SnippetModel, Snippet_TagModel } from '../models';

export const associateModels = async () => {
  TagModel.belongsToMany(SnippetModel, {
    through: Snippet_TagModel,
    foreignKey: 'tag_id',
    as: 'snippets'
  });

  SnippetModel.belongsToMany(TagModel, {
    through: Snippet_TagModel,
    foreignKey: 'snippet_id',
    as: 'tags'
  });
};
