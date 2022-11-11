import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {getByUUID} from "../services/users.service";
import {UUID} from "../entities/UUID";
import {Role} from "../entities/Role";


export function guard(roles: Role[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        const {user} = req.body;
        if (!user) return res.status(403).json({message: "Unauthorized"});

        if (roles.includes(user.role)) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            return res.status(403).json({message: "Forbidden"}); // user is forbidden
        }
    }

}

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization;
    if (!token) return res.status(401).json({message: 'Unauthorized. missing token'});

    token = token.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('[auth.middleware][auth][error] ', err);
            return res.status(401).json({message: 'Unauthorized'});
        }

        const uuid = decoded?.sub as UUID
        const user = await getByUUID(uuid)

        if (user.status !== 'ACTIVE') {
            return res.status(403).json(
                {
                    message: 'User account status is either inactive or disabled'
                }
            );
        }

        req.body = {'user': user}
        next();
    });
};
