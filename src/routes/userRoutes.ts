import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate, authorizeAdmin, authorizeSelfOrAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users/:id', authenticate, authorizeSelfOrAdmin, userController.getUser);
router.get('/users', authenticate, authorizeAdmin, userController.getUsers);
router.patch('/users/:id/block', authenticate, authorizeSelfOrAdmin, userController.block);

export default router;