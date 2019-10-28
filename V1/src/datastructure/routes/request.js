import express from 'express';
import requestController from '../controllers/requestController';

const appRouter = express.Router();

appRouter.post('/user/request', requestController.create);
appRouter.get('/user/requests', requestController.getAll);
appRouter.get('/user/request/:id', requestController.getOne);
appRouter.put('/user/request/:id', requestController.update);
appRouter.delete('/user/request/:id', requestController.delete);

export default appRouter;