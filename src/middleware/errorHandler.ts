import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, Logger } from '../utils';

const logger = new Logger('errorHandler');

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.log(err.message, 'ERROR');

  if (process.env.NODE_ENV == 'development') {
    console.log(err);
  }

  const error = {
    ...err
  };

  if (err.message == 'Validation error') {
    // @ts-ignore
    error.message = err.errors[0].message;
    error.statusCode = 400;
  }

  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
};
