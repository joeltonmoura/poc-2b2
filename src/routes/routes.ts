import { request, response, Router, NextFunction as next } from 'express';
import { TesteConnectionBd } from '../controllers/testeConnectionBd';

const router = Router();

router.get('/test', (request, response) => TesteConnectionBd.handle(request, response));

export { router };
