import { Router } from 'express';
import empRouter from './emp.routes';

const routes = Router();

routes.use('/emp', empRouter);

export default routes;

