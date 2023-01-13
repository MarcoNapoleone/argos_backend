import * as ModulesModel from "../models/modules.model";
import {NextFunction, Request, Response} from "express";
import {formattedResponse} from "../utils/formattedResponse";
import {checkPermission} from "../services/permission.service";
import {Event} from "../entities/Event";

const getEvent = (req: Request): Event => {
  switch (req.method) {
    case "GET":
      return "READ"
    case "POST":
      return "CREATE"
    case "PUT":
      return "UPDATE"
    case "DELETE":
      return "DELETE"
  }
}

type moduleName = "USER"
  | "COMPANY"
  | "LOCAL_UNIT"
  | "HR"
  | "DASHBOARD"


export function guard(moduleName: moduleName) {

  return async (req: Request, res: Response, next: NextFunction) => {
    const {user} = req.body;
    const {params: {companyId}} = req;

    //todo: get module id from SERVICE module name
    const {id: moduleId} = await ModulesModel.getByName(moduleName)

    if (!user) return res.status(401).json(
      formattedResponse({
        status: 401,
        object: "authentication",
      })
    );

    if (!moduleId) return res.status(500).json(
      formattedResponse({
        status: 500,
        object: "authentication",
      })
    );

    if (!companyId) return res.status(500).json(
      formattedResponse({
        status: 500,
        object: "authentication",
      })
    );

    if (await checkPermission(user.id, companyId, moduleId, getEvent(req))) {
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

}