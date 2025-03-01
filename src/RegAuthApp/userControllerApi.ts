import { Request, Response } from 'express';
import userService from './userService';

async function authUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.login(data.email, data.password)

    if (result.status == 'error') {
        res.status(400).json(result)
        return
    }

    res.cookie('token', {login: result.data})
    res.status(200)
}

async function registerUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.register(data)

    if (result.status == 'error') {
        res.status(400).json(result)
        return
    }

    res.cookie('token', {reg: result.data})
    res.status(200)
}

async function logoutUser(req: Request, res: Response) {
    res.clearCookie('token')
    res.status(200).json({ status: "success", message: "Logged out successfully" })
}

async function aboutUser(req: Request, res: Response){
    const userId = res.locals.userId
    const result = await userService.getUserById(userId)

    if (result.status === 'error') {
        res.status(400)
    }
    res.status(200).json({ user: result });
}

const userControllerApi = {
    authUser: authUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
    aboutUser: aboutUser
};

export default userControllerApi