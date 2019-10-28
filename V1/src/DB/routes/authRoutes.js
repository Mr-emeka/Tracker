import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/auth/signup', authController.create);
router.post('/auth/login', authController.login);

export default router;