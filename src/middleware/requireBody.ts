import { Request, Response, NextFunction } from 'express';

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

    next();
  };
