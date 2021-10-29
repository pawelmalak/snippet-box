import { Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { SnippetModel, Snippet_TagModel } from '../../models';
import { UserInfoRequest } from '../../typescript/interfaces';
import { ErrorResponse } from '../../utils';

interface Params {
  id: number;
}

/**
 * @description Delete snippet
 * @route /api/snippets/:id
 * @request DELETE
 * @access Private
 */
export const deleteSnippet = asyncWrapper(
  async (
    req: UserInfoRequest<{}, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const snippet = await SnippetModel.findOne({
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

    // Delete all snippet <> tag relations
    await Snippet_TagModel.destroy({ where: { snippet_id: req.params.id } });
    await snippet.destroy();

    res.status(200).json({
      data: {}
    });
  }
);
