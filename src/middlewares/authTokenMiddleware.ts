import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/token";

interface IToken{
    iat: number
    exp: number
    id: number
}

export function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(400)
        return 
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        res.status(401)
    }

    try {
        const decoded = verify(token, SECRET_KEY) as IToken
        res.locals.userId = decoded.id
        console.log("22: ", decoded)
        next();

    } catch (error) {
        res.status(401)
    }
}