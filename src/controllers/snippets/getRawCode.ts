import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../../middleware';
import { SnippetModel } from '../../models';
import { ErrorResponse } from '../../utils';

interface Params {
  id: number;
}

/**
 * @description Get raw snippet code
 * @route /api/snippets/raw/:id
 * @request GET
 * @access Private
 */
export const getRawCode = asyncWrapper(
  async (
    req: Request<Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const snippet = await SnippetModel.findOne({
      where: { id: req.params.id },
      raw: true
    });

    if (!snippet) {
      return next(
        new ErrorResponse(
          404,
          `Snippet with the id of ${req.params.id} was not found`
        )
      );
    }

    res.status(200).send(snippet.code);
  }
);
