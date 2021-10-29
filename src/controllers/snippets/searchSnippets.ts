import { Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { SnippetModel, TagModel } from '../../models';
import { Op } from 'sequelize';
import { UserInfoRequest } from '../../typescript/interfaces';

interface Body {
  query: string;
  tags: string[];
  languages: string[];
}

/**
 * @description Search snippets
 * @route /api/snippets/search
 * @request POST
 * @access Private
 */
export const searchSnippets = asyncWrapper(
  async (
    req: UserInfoRequest<Body>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { query, tags, languages } = req.body;

    // Check if query is empty
    if (query === '' && !tags.length && !languages.length) {
      res.status(200).json({
        data: []
      });

      return;
    }

    const languageFilter = languages.length
      ? { [Op.in]: languages }
      : { [Op.notIn]: languages };

    const tagFilter = tags.length ? { [Op.in]: tags } : { [Op.notIn]: tags };

    const snippets = await SnippetModel.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { title: { [Op.substring]: `${query}` } },
              { description: { [Op.substring]: `${query}` } }
            ]
          },
          {
            language: languageFilter
          },
          {
            createdBy: req.user.id
          }
        ]
      },
      include: {
        model: TagModel,
        as: 'tags',
        attributes: ['name'],
        where: {
          name: tagFilter
        },
        through: {
          attributes: []
        }
      }
    });

    res.status(200).json({
      data: snippets
    });
  }
);
