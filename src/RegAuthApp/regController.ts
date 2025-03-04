import { Request, Response } from 'express';
import userService from './userService';
import { SECRET_KEY } from '../config/token'
import { sign } from 'jsonwebtoken'

async function authRegistrtation (req: Request, res: Response){

    const data = req.body
    console.log(data)
    const result  = await userService.register(data);

    if (result.status === 'error') {
        res.send(result.message)
        return
    }

    res.cookie('token', result.data)
    res.status(200)
    res.send("Ви зареєстровані!")

}

async function authGetRegistrtation(req: Request, res: Response){
    res.render('registration')
}


const regController = {
    authRegistrtation: authRegistrtation,
    authGetRegistrtation: authGetRegistrtation
}

export default regController