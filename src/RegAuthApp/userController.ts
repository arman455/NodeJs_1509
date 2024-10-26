import { Request, Response } from 'express';
import userService from './userService';

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
        return res.status(401).json({ message: 'Invalid!', user });;
    }
}

async function authRegistrtation (req: Request, res: Response){

    const data = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }
    const result  = await userService.register(String(data.email), String(data.password));

    if (result === "User exists") {
        return res.status(400).json({ message: 'User already exists' });
    }

    if (result) {
        res.cookie('user', JSON.stringify(data));
        return res.status(200).json({ message: 'Registration successful', user: result });
    }


}

const userController = {
    authLogin: authLogin,
    authRegistrtation: authRegistrtation
}

export default userController