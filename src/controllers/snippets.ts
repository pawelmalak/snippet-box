import { Request, Response, NextFunction } from 'express';
import { asyncWrapper } from '../middleware';
import { SnippetModel } from '../models';

export const createSnippet = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const snippet = await SnippetModel.create(req.body);

    res.status(201).json({
      data: snippet
    });
  }
);
