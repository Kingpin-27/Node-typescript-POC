import { Router } from 'express';
import conteroller from '../controller';

const empRouter = Router();

empRouter.get('/find', conteroller.getAll);
empRouter.get('/findOne', conteroller.getOne);

empRouter.put('/', conteroller.createNew);

empRouter.post('/', conteroller.update);

empRouter.delete('/', conteroller.delete);

export default empRouter;