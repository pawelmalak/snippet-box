import dotenv from 'dotenv';
import express from 'express';
import { Logger } from './utils';

// Env config
dotenv.config({ path: './src/config/.env' });

const app = express();
const logger = new Logger();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.log(
    `Server is working on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
