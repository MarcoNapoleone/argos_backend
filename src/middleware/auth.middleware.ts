import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({message: "Unauthorized!"});

    token = token.split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) next(new Error(`[${err.name}][${err.message}]`))
            req.body = decoded
        });
        next();
    } catch (error) {
        console.error('[auth.middleware][auth][error] ', error);
        res.status(403).json({message: "Unauthorized!"});
    }
};
