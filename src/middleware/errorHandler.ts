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

  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
};
