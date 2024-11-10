import { Request, Response } from 'express';
import userService from './userService';

async function authRegistrtation (req: Request, res: Response){

    const data = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }
    const result  = await userService.register(String(data.email), String(data.password));

    if (result === "User exists") {
        res.status(400).json({ message: 'User already exists' });
        return
    }

    if (result) {
        
        res.cookie('user', JSON.stringify(data));
        res.status(200).json({ message: 'Registration successful', user: result });
        return
    }


}

async function authGetRegistrtation(req: Request, res: Response){
    res.render('registration')
}


const regController = {
    authRegistrtation: authRegistrtation,
    authGetRegistrtation: authGetRegistrtation
}

export default regController