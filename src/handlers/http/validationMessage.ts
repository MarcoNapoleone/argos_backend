import {validationResult} from "express-validator";
import {Request} from "express";


export const validationMessage = (req: Request): string => {
  return validationResult(req).array()[0].msg
    + ' at '
    + validationResult(req)
      .array()[0]
      .param
      .toString()
      .replace('object.', '');
}
