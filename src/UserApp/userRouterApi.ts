import express from 'express';
import userControllerApi from './userControllerApi';
import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';

const router = express.Router();

router.post('/login', userControllerApi.authUser);
router.post('/register', userControllerApi.registerUser);
router.post('/logout', userControllerApi.logoutUser);
router.get('/me', authTokenMiddleware, userControllerApi.getUserById);

export default router;