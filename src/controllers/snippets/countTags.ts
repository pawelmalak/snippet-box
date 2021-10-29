import { Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../../db';
import { asyncWrapper } from '../../middleware';
import { UserInfoRequest } from '../../typescript/interfaces';

/**
 * @description Count tags
 * @route /api/snippets/statistics/count
 * @request GET
 * @access Private
 */
export const countTags = asyncWrapper(
  async (
    req: UserInfoRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let where = !req.user.isAdmin
      ? `WHERE snippets.createdBy = ${req.user.id}`
      : '';

    const result = await sequelize.query(
      `SELECT
        COUNT(tags.name) as count,
        tags.name
      FROM snippets_tags
      INNER JOIN tags ON snippets_tags.tag_id = tags.id
      INNER JOIN snippets ON snippets_tags.snippet_id = snippets.id
      ${where}
      GROUP BY tags.name
      ORDER BY name ASC`,
      {
        type: QueryTypes.SELECT
      }
    );

    res.status(200).json({
      data: result
    });
  }
);
