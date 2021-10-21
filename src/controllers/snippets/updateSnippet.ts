import { Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { SnippetModel, Snippet_TagModel } from '../../models';
import { ErrorResponse, tagParser, createTags } from '../../utils';
import { Snippet, UserInfoRequest } from '../../typescript/interfaces';

interface Body extends Snippet {}

interface Params {
  id: number;
}

/**
 * @description Update snippet
 * @route /api/snippets/:id
 * @request PUT
 * @access Private
 */
export const updateSnippet = asyncWrapper(
  async (
    req: UserInfoRequest<Body, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let snippet = await SnippetModel.findOne({
      where: { id: req.params.id }
    });

    if (!snippet) {
      return next(
        new ErrorResponse(
          404,
          `Snippet with the id of ${req.params.id} was not found`
        )
      );
    }

    if (snippet.createdBy != req.user.id && !req.user.isAdmin) {
      return next(
        new ErrorResponse(401, `You are not authorized to modify this resource`)
      );
    }

    // Get tags from request body
    const { language, tags: requestTags = [] } = req.body;
    let parsedRequestTags = tagParser([...requestTags, language.toLowerCase()]);

    // todo
    // check if tags and/or lang was changed

    // Update snippet
    snippet = await snippet.update({
      ...req.body
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
