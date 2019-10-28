import express from 'express';
import userController from '../controllers/userController';
import userAuthentication from '../middlewares/userAuthentication';

const router = express.Router();

router.post('/users/requests', userAuthentication.verifyToken, userController.create);
router.get('/users/requests', userAuthentication.verifyToken, userController.getAll);
router.get('/users/requests/:requestId', userAuthentication.verifyToken, userController.getOne);
router.put('/users/requests/:requestId', userAuthentication.verifyToken, userController.update);
router.delete('/users/requests/:requestId', userAuthentication.verifyToken, userController.delete);

export default router;