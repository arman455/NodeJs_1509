import express from 'express';
import userControllerApi from './userControllerApi';

const router = express.Router();

router.post('/login', userControllerApi.authUser);
router.post('/register', userControllerApi.registerUser);
router.post('/logout', userControllerApi.logoutUser);

export default router;