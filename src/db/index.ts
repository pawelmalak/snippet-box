require('ts-node/register');
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { Logger } from '../utils';

const logger = new Logger();

// DB config
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/db.sqlite3',
  logging: false
});

// Migrations config
const umzug = new Umzug({
  migrations: { glob: '**/migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined
});

export type Migration = typeof umzug._types.migration;

export const connectDB = async () => {
  try {
    // Create & connect db
    await sequelize.authenticate();
    logger.log('Database connected');

    // Check migrations
    const pendingMigrations = await umzug.pending();
    if (pendingMigrations.length > 0) {
      logger.log(`Found pending migrations. Executing...`);
    }

    await umzug.up();
  } catch (err) {
    logger.log(`Database connection error`, 'ERROR');

    if (process.env.NODE_ENV == 'development') {
      console.log(err);
    }

    process.exit(1);
  }
};
