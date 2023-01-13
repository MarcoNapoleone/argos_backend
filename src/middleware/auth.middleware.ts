import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {getByUUID} from "../services/users.service";
import {formattedResponse} from "../utils/formattedResponse";
import {UUID} from "../utils/uuid";

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
    const user = await getByUUID(uuid)

    if (user.status !== 'ACTIVE') {
      return res.status(403).json(
        formattedResponse({
          status: 403,
          object: "authentication",
          message: "User account status is either inactive or disabled"
        })
      )
    }

    req.body = {'user': user, 'object': req.body}
    next();
  });
};

