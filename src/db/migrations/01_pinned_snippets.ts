import { DataTypes, QueryInterface } from 'sequelize';
const { INTEGER } = DataTypes;

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.addColumn('snippets', 'isPinned', {
    type: INTEGER,
    allowNull: true,
    defaultValue: 0
  });
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.removeColumn('snippets', 'isPinned');
};
