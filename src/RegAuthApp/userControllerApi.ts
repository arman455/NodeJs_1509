import { Request, Response } from 'express';
import userService from './userService';

async function authUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.login(data.email, data.password)
    res.json(result);
}

async function registerUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.register(data)
    res.json(result);

}
// Контроллер API не работаетс куками, токен будет хранится иначе
// асинхронность здесь также не нужна
async function logoutUser(req: Request, res: Response) {
    res.clearCookie('token')
    res.status(200).json({ status: "success", message: "Logged out successfully" })
}

async function getUserById(req: Request, res: Response){
    const id = res.locals.userId
    console.log("id: ",id)
    const result = await userService.getUserById(id)
    res.json(result);
}

const userControllerApi = {
    authUser: authUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
    getUserById: getUserById
};

export default userControllerApi