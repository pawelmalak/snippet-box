import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db';
import { asyncWrapper } from '../middleware';
import { SnippetInstance, SnippetModel } from '../models';
import { ErrorResponse, getTags, tagsParser, Logger } from '../utils';

const logger = new Logger('snippets-controller');

/**
 * @description Create new snippet
 * @route /api/snippets
 * @request POST
 */
export const createSnippet = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { language, tags } = <{ language: string; tags: string }>req.body;
    const parsedTags = tagsParser(tags);

    if (!parsedTags.includes(language.toLowerCase())) {
      parsedTags.push(language.toLowerCase());
    }

    const snippet = await SnippetModel.create({
      ...req.body,
      tags: parsedTags.join(',')
    });

    res.status(201).json({
      data: snippet
    });
  }
);

/**
 * @description Get all snippets
 * @route /api/snippets
 * @request GET
 */
export const getAllSnippets = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const snippets = await SnippetModel.findAll({
      raw: true
    });

    await new Promise<void>(async resolve => {
      try {
        for await (let snippet of snippets) {
          const tags = await getTags(+snippet.id);
          snippet.tags = tags;
        }
      } catch (err) {
        logger.log('Error while fetching tags');
      } finally {
        resolve();
      }
    });

    res.status(200).json({
      data: snippets
    });
  }
);

/**
 * @description Get single snippet by id
 * @route /api/snippets/:id
 * @request GET
 */
export const getSnippet = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const snippet = await SnippetModel.findOne({
      where: { id: req.params.id },
      raw: true
    });

    if (!snippet) {
      return next(
        new ErrorResponse(
          404,
          `Snippet with id of ${req.params.id} was not found`
        )
      );
    }

    const tags = await getTags(+req.params.id);
    snippet.tags = tags;

    res.status(200).json({
      data: snippet
    });
  }
);

/**
 * @description Update snippet
 * @route /api/snippets/:id
 * @request PUT
 */
export const updateSnippet = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let snippet = await SnippetModel.findOne({
      where: { id: req.params.id }
    });

    if (!snippet) {
      return next(
        new ErrorResponse(
          404,
          `Snippet with id of ${req.params.id} was not found`
        )
      );
    }

    // Check if language was changed. Edit tags if so
    const { language: oldLanguage } = snippet;
    const { language, tags } = <{ language: string; tags: string }>req.body;
    let parsedTags = tagsParser(tags);

    if (oldLanguage != language) {
      parsedTags = parsedTags.filter(tag => tag != oldLanguage);

      if (!parsedTags.includes(language)) {
        parsedTags.push(language.toLowerCase());
      }
    }

    snippet = await snippet.update({
      ...req.body,
      tags: parsedTags.join(',')
    });

    res.status(200).json({
      data: snippet
    });
  }
);

/**
 * @description Delete snippet
 * @route /api/snippets/:id
 * @request DELETE
 */
export const deleteSnippet = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const snippet = await SnippetModel.findOne({
      where: { id: req.params.id }
    });

    if (!snippet) {
      return next(
        new ErrorResponse(
          404,
          `Snippet with id of ${req.params.id} was not found`
        )
      );
    }

    await snippet.destroy();

    res.status(200).json({
      data: {}
    });
  }
);

/**
 * @description Count tags
 * @route /api/snippets/statistics/count
 * @request GET
 */
export const countTags = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await sequelize.query(
      `SELECT
        COUNT(tags.name) as count,
        tags.name
      FROM snippets_tags
      INNER JOIN tags ON snippets_tags.tag_id = tags.id
      GROUP BY tags.name
      ORDER BY name ASC`,
      {
        type: QueryTypes.SELECT
      }
    );

    res.status(200).json({
      data: result
    });
  }
);
