import { Response, NextFunction } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../../db';
import { asyncWrapper } from '../../middleware';

/**
 * @description Count tags
 * @route /api/snippets/statistics/count
 * @request GET
 * @access Private
 */
export const countTags = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await sequelize.query(
      `SELECT
        COUNT(tags.name) as count,
        tags.name
      FROM snippets_tags
      INNER JOIN tags ON snippets_tags.tag_id = tags.id
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
