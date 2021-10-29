import { Router } from 'express';
import { authenticate, requireBody } from '../middleware';

import {
  createSnippet,
  getAllSnippets,
  getSnippet,
  deleteSnippet,
  countTags,
  getRawCode,
  searchSnippets,
  updateSnippet
} from '../controllers/snippets/';

export const snippetRouter = Router();

snippetRouter
  .route('/')
  .post(
    authenticate,
    requireBody('title', 'language', 'code', 'tags'),
    createSnippet
  )
  .get(authenticate, getAllSnippets);

snippetRouter
  .route('/:id')
  .get(authenticate, getSnippet)
  .put(authenticate, updateSnippet)
  .delete(authenticate, deleteSnippet);

snippetRouter.route('/statistics/count').get(authenticate, countTags);
snippetRouter.route('/raw/:id').get(authenticate, getRawCode);
snippetRouter.route('/search').post(authenticate, searchSnippets);
