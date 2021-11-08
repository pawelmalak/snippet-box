import { NextFunction } from 'express';
import { ErrorResponse } from '.';

export const resourceExists = (
  resource: any,
  name: string,
  id: number,
  next: NextFunction
) => {
  if (!resource) {
    return next(
      new ErrorResponse(404, `${name} with the id of ${id} was not found`)
    );
  }

  return;
};
