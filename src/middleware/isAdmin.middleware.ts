import {NextFunction, Request, Response} from "express";
import {formattedResponse} from "../utils/formattedResponse";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const {user} = req.body;
    if (!user) return res.status(401).json(
        formattedResponse({
            status: 401,
            object: "authentication",
        })
    );

    if (user.role === "ADMIN") {
        // role is allowed, so continue on the next middleware
        next();
    } else {
        // user is forbidden
        return res.status(403).json(
            formattedResponse({
                status: 403,
                object: "authentication",
            })
        );
    }

}