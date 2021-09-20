import { Router } from 'express';
import { createSnippet } from '../controllers/snippets';
import { requireBody } from '../middleware';

export const snippetRouter = Router();

snippetRouter.route('/').post(requireBody('title', 'language'), createSnippet);
