import express, { Express, Request, Response } from 'express';
import userService from './userService';
import { SECRET_KEY } from '../config/token';
import { sign } from 'jsonwebtoken';

async function authUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.login(data.email, data.password)

    if (result.status == 'error') {
        res.status(400).json(result)
        return
    }

    const token = sign(result.data, SECRET_KEY, { expiresIn: '1h' })
    res.cookie('token', token)
    res.status(200).json({ status: "success", token: token })
}

async function registerUser(req: Request, res: Response) {
    const data = req.body
    const result = await userService.register(data)

    if (result.status == 'error') {
        res.status(400).json(result)
        return
    }

    const token = sign(result.data, SECRET_KEY, { expiresIn: '1h' })
    res.cookie('token', token)
    res.status(200).json({ status: "success", token: token })
}

async function logoutUser(req: Request, res: Response) {
    res.clearCookie('token');
    res.status(200).json({ status: "success", message: "Logged out successfully" });
}

const userControllerApi = {
    authUser: authUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
};

export default userControllerApi