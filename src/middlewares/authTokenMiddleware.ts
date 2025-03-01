import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/token";

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
        const decoded = verify(token, SECRET_KEY) as { userId: number };
        res.locals.userId = decoded.userId;
        console.log("11", authHeader)
        console.log("22", decoded)
        next();

    } catch (error) {
        res.status(401)
    }
}