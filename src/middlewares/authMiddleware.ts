import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/token';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies; 

    if (cookies.user) {
        try {
            const user = JSON.parse(cookies.user);

            if (user.email && user.name && user.role) {
                console.log("User authenticated");
                return next();
            }
        } catch (error) {
            console.error("Error parsing cookies:", error);
        }
    }

    //JWT

    if (cookies.token){
        const token = verify(cookies.token, SECRET_KEY)
        res.locals.user = token}

    return res.sendStatus(401);
}
