import { join } from 'path';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { Logger } from './utils';
import { connectDB } from './db';
import { errorHandler } from './middleware';

// Routers
import { snippetRouter } from './routes/snippets';
import { associateModels } from './db/associateModels';

// Env config
dotenv.config({ path: './src/config/.env' });

const app = express();
const logger = new Logger('server');
const PORT = process.env.PORT || 5000;

// App config
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

// Serve client code
app.get(/^\/(?!api)/, (req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

// Routes
app.use('/api/snippets', snippetRouter);

// Error handler
app.use(errorHandler);

(async () => {
  await connectDB();
  await associateModels();

  app.listen(PORT, () => {
    logger.log(
      `Server is working on port ${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
})();
