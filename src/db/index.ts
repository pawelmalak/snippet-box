import path from 'path';
import { Sequelize } from 'sequelize';
import Umzug from 'umzug';
import { Logger } from '../utils';

const logger = new Logger('db');

// DB config
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/db.sqlite3',
  logging: false
});

// Migrations config
const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, './migrations'),
    params: [sequelize.getQueryInterface()],
    pattern: /^\d+[\w-]+\.(js|ts)$/
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize
  },
  logging: false
});

export const connectDB = async () => {
  const isDev = process.env.NODE_ENV == 'development';

  try {
    // Create & connect db
    await sequelize.authenticate();
    logger.log('Database connected');

    // Check migrations
    const pendingMigrations = await umzug.pending();

    if (pendingMigrations.length > 0) {
      logger.log(`Found pending migrations. Executing...`);

      if (isDev) {
        pendingMigrations.forEach(({ file }) =>
          logger.log(`Executing ${file} migration`, 'DEV')
        );
      }
    }

    await umzug.up();
  } catch (err) {
    logger.log(`Database connection error`, 'ERROR');

    if (isDev) {
      console.log(err);
    }

    process.exit(1);
  }
};
