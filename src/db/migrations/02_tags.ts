import { Logger } from '../../utils';
import { DataTypes, QueryInterface } from 'sequelize';
import {
  SnippetModel,
  Snippet_TagModel,
  TagInstance,
  TagModel
} from '../../models';

const { STRING, INTEGER } = DataTypes;
const logger = new Logger('migration[02]');

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable('tags', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    }
  });

  await queryInterface.createTable('snippets_tags', {
    id: {
      type: INTEGER,
      allowNull: false,
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
  });

  // Create new tags from language column
  const snippets = await SnippetModel.findAll();
  const languages = snippets.map(snippet => snippet.language);
  const uniqueLanguages = [...new Set(languages)];
  const tags: TagInstance[] = [];

  if (snippets.length > 0) {
    await new Promise<void>(resolve => {
      uniqueLanguages.forEach(async language => {
        try {
          const tag = await TagModel.create({ name: language });
          tags.push(tag);
        } catch (err) {
          logger.log('Error while creating new tags');
        } finally {
          if (uniqueLanguages.length == tags.length) {
            resolve();
          }
        }
      });
    });

    // Assign tag to snippet
    await new Promise<void>(resolve => {
      snippets.forEach(async snippet => {
        try {
          const tag = tags.find(tag => tag.name == snippet.language);

          if (tag) {
            await Snippet_TagModel.create({
              snippet_id: snippet.id,
              tag_id: tag.id
            });
          }
        } catch (err) {
          logger.log('Error while assigning tags to snippets');
        } finally {
          resolve();
        }
      });
    });
  }
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable('tags');
  await queryInterface.dropTable('snippets_tags');
};
