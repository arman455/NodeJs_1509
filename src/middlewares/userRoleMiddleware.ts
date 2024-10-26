import { Request, Response, NextFunction } from 'express';

export function userRoleMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;

    if (cookies.user) {
        try {
            const user = JSON.parse(cookies.user); 

            if (user.role === 'admin') {
                console.log("User has admin role");
                return next();
            }
        } catch (error) {
            console.error("Error parsing cookies:", error);
        }
    }

    return res.sendStatus(403);
}
