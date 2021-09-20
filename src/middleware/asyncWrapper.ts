import { Request, Response, NextFunction } from 'express';

type Foo = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncWrapper =
  (foo: Foo) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(foo(req, res, next)).catch(next);
  };
