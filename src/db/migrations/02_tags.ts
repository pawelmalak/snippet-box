import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
import { sequelize } from '../';
const { STRING } = DataTypes;

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.addColumn('snippets', 'tags', {
    type: STRING,
    allowNull: true,
    defaultValue: ''
  });

  await sequelize.query(`UPDATE snippets SET tags = language`, {
    type: QueryTypes.UPDATE
  });
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.removeColumn('snippets', 'tags');
};
