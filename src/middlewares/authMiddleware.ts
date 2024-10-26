import { Request, Response, NextFunction } from 'express';

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

    return res.sendStatus(401);
}
