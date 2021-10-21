import { Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { SnippetModel, TagModel } from '../../models';
import { UserInfoRequest } from '../../typescript/interfaces';
import { ErrorResponse } from '../../utils';

interface Params {
  id: number;
}

/**
 * @description Get single snippet by id
 * @route /api/snippets/:id
 * @request GET
 * @access Private
 */
export const getSnippet = asyncWrapper(
  async (
    req: UserInfoRequest<{}, Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const snippet = await SnippetModel.findOne({
      where: { id: req.params.id },
      include: {
        model: TagModel,
        as: 'tags',
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
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
        new ErrorResponse(401, `You are not authorized to access this resource`)
      );
    }

    const rawSnippet = snippet.get({ plain: true });

    if (rawSnippet.tags) {
      // @ts-ignore
      const rawTags = rawSnippet.tags as { name: string }[];

      const populatedSnippet = {
        ...rawSnippet,
        tags: rawTags.map(tag => tag.name)
      };

      res.status(200).json({
        data: populatedSnippet
      });
    }
  }
);
