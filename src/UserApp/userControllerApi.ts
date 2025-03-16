import { Request, Response } from 'express';
import userService from './userService';

async function authUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.login(data.email, data.password)
    res.json(result)
}

async function registerUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.register(data)
    res.json(result)
}

function logoutUser(req: Request, res: Response) {
    res.json({ status: "success", message: "Logged out successfully" })
}

async function getUserById(req: Request, res: Response){
    const id = res.locals.userId
    const result = await userService.getUserById(id)
    res.json(result)
}

const userControllerApi = {
    authUser: authUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
    getUserById: getUserById
};

export default userControllerApi