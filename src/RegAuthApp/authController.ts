import { Request, Response } from 'express';
import userService from './userService';
import { SECRET_KEY } from '../config/token'
import { sign } from 'jsonwebtoken'

async function authLogin(req: Request, res: Response) {

    const data = req.body
    const user = await userService.login(data.email, data.password);

    if (user.status === 'error'){
        res.send(user.message)
        return 
    }

    const token = sign(user, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', token)
    res.status(200)
    res.send("Ви увійшли!")
}

async function authGetLogin(req: Request, res: Response){
    res.render('login')
}

const authController = {
    authLogin: authLogin,
    authGetLogin: authGetLogin,
}

export default authController