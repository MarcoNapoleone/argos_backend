import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {getByUUID} from "../services/users.service";
import {Role} from "../entities/Role";
import {formattedResponse} from "../utils/formattedResponse";
import {UUID} from "../utils/uuid";

export function guard(roles: Role[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        const {user} = req.body;
        if (!user) return res.status(401).json(
            formattedResponse({
                status: 401,
                object: "authentication",
            }));

        if (roles.includes(user.role)) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            return res.status(403).json(
                formattedResponse({
                    status: 403,
                    object: "authentication",
                })
            ); // user is forbidden
        }
    }

}

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json(
            formattedResponse({
                status: 401,
                object: "authentication",
                message: "Missing token"
            })
        )
    }

    token = token.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json(
                formattedResponse({
                    status: 401,
                    object: "authentication",
                    message: "Could not verify token"
                })
            )
        }

        const uuid = decoded?.sub as UUID
        const {data: user} = await getByUUID(uuid)

        if (user.status !== 'ACTIVE') {
            return res.status(403).json(
                formattedResponse({
                    status: 403,
                    object: "authentication",
                    message: "User account status is either inactive or disabled"
                })
            )
        }

        req.body = {'user': user}
        next();
    });
};

