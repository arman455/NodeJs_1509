import { Request, Response } from 'express';
import userService from './userService';
import { SECRET_KEY } from '../config/token'
import { sign } from 'jsonwebtoken'

async function authLogin(req: Request, res: Response){
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await userService.login(String(data.email), String(data.password));

    if (user) {
        res.cookie('user', data)
        res.sendStatus(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid!', user });
        return
    }

    const token = sign(user, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', token)
}

async function authGetLogin(req: Request, res: Response){
    res.render('login')
}

const authController = {
    authLogin: authLogin,
    authGetLogin: authGetLogin,
}

export default authController