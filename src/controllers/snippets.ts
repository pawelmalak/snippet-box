import { Request, Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../db';
import { asyncWrapper } from '../middleware';
import { SnippetModel, Snippet_TagModel } from '../models';
import {
  ErrorResponse,
  getTags,
  tagParser,
  Logger,
  createTags
} from '../utils';
import { Body } from '../typescript/interfaces';

const logger = new Logger('snippets-controller');

/**
 * @description Create new snippet
 * @route /api/snippets
 * @request POST
 */
export const createSnippet = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get tags from request body
    const { language, tags: requestTags } = <Body>req.body;
    const parsedRequestTags = tagParser([
      ...requestTags,
      language.toLowerCase()
    ]);

    // Create snippet
    const snippet = await SnippetModel.create({
      ...req.body,
      tags: [...parsedRequestTags].join(',')
    });

    // Create tags
    await createTags(parsedRequestTags, snippet.id);

    // Get raw snippet values
    const rawSnippet = snippet.get({ plain: true });

    res.status(201).json({
      data: {
        ...rawSnippet,
        tags: [...parsedRequestTags]
      }
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
        logger.log('Error while fetching tags', 'ERROR');
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

    // Get tags from request body
    const { language, tags: requestTags } = <Body>req.body;
    let parsedRequestTags = tagParser([...requestTags, language.toLowerCase()]);

    // Update snippet
    snippet = await snippet.update({
      ...req.body,
      tags: [...parsedRequestTags].join(',')
    });

    // Delete old tags and create new ones
    await Snippet_TagModel.destroy({ where: { snippet_id: req.params.id } });
    await createTags(parsedRequestTags, snippet.id);

    // Get raw snippet values
    const rawSnippet = snippet.get({ plain: true });

    res.status(200).json({
      data: {
        ...rawSnippet,
        tags: [...parsedRequestTags]
      }
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

    await Snippet_TagModel.destroy({ where: { snippet_id: req.params.id } });
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

/**
 * @description Get raw snippet code
 * @route /api/snippets/raw/:id
 * @request GET
 */
export const getRawCode = asyncWrapper(
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

    res.status(200).send(snippet.code);
  }
);
