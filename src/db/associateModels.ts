import { TagModel, SnippetModel, Snippet_TagModel, UserModel } from '../models';

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

  UserModel.hasMany(SnippetModel, {
    foreignKey: 'createdBy',
    as: 'snippets'
  });

  SnippetModel.belongsTo(UserModel, {
    foreignKey: 'createdBy',
    as: 'user'
  });
};
