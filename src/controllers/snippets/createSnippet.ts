import { Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { SnippetModel } from '../../models';
import { Snippet, UserInfoRequest } from '../../typescript/interfaces';
import { tagParser, createTags } from '../../utils';

interface RequestBody extends Snippet {}

/**
 * @description Create new snippet
 * @route /api/snippets
 * @request POST
 * @access Private
 */
export const createSnippet = asyncWrapper(
  async (
    req: UserInfoRequest<RequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Get tags from request body
    const { language, tags: requestTags = [] } = req.body;

    const parsedRequestTags = tagParser([
      ...requestTags,
      language.toLowerCase()
    ]);

    // Create snippet
    const snippet = await SnippetModel.create({
      ...req.body,
      createdBy: req.user.id
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
