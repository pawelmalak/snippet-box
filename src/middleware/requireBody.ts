import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils';

export const requireBody =
  (...fields: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const bodyKeys = Object.keys(req.body);
    const missingKeys: string[] = [];

    fields.forEach(field => {
      if (!bodyKeys.includes(field)) {
        missingKeys.push(field);
      }
    });

    if (missingKeys.length > 0) {
      return next(
        new ErrorResponse(400, `These fields are required: ${missingKeys}`)
      );
    }

    next();
  };
