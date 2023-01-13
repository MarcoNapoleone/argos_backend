import {NextFunction, Request, Response} from "express";
import {formattedResponse} from "../utils/formattedResponse";

export const isJSON = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if the request object is a JSON by stringify it
    JSON.stringify(req.body);
  } catch (error) {
    return res.status(400).json(
      formattedResponse({
        status: 400,
        object: "request_body",
        message: "Invalid JSON"
      })
    )
  }
  next();
}
