import express, {Request, Response} from 'express';
import {LocalUnitsController} from "../controllers/localUnits.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {objectParser} from "../handlers/objects/objectParser";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";

const localUnitsRouter = express.Router({mergeParams: true});

/* GET local-units/:id - get localUnit by id */
localUnitsRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new LocalUnitsController();
    const user: User = req.body.user
    const response = await controller.getById(id);
    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "local unit",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "local unit",
      })
    )
  }
});

/* POST local-units/:id - create new localUnit */
localUnitsRouter.post('/',
  [
    check("object.name")
      .isLength({min: 3})
      .withMessage("the name must have minimum length of 3")
      .trim(),
    check("object.email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),
    check("object.postalCode")
      .isLength({min: 5, max: 5}),
    check("object.companyId")
      .not().isEmpty()
      .withMessage('Company id cannot be empty'),
  ],
  async (req: Request, res: Response) => {

    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "local unit",
          message: validationMessage(req)
        })
      );
    }

    try {
      const controller = new LocalUnitsController();
      const response = await controller.create(req.body.object);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(
        formattedResponse({
          status: 500,
          Error: error,
          object: "local unit",
        }))
    }
  });

/* PUT local-units/:id - update localUnit */
localUnitsRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new LocalUnitsController();
    const response = await controller.update(id, objectParser(req.body.object));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "local unit",
      })
    )
  }
});

/* PUT local-units/:id - logic delete localUnit */
localUnitsRouter.delete('/:id', async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new LocalUnitsController();
    const response = await controller.logicDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(formattedResponse({
      status: 500,
      object: "local unit",
    }));
  }
});

/* GET local-units/:id/departments - get all departments of local unit */
localUnitsRouter.get('/:id/departments', async (req: Request, res: Response) => {

  const {params: {id}} = req;
  try {
    const user: User = req.body.user
    const controller = new LocalUnitsController();
    const response = await controller.getAllDepartments(id);
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "local unit",
      })
    );
  }
});

/* GET local-units/:id/vehicles - get all vehicles of local unit */
localUnitsRouter.get('/:id/vehicles', async (req: Request, res: Response) => {

  const {params: {id}} = req;
  try {
    const user: User = req.body.user
    const controller = new LocalUnitsController();
    const response = await controller.getAllVehicles(id);
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "local unit",
      })
    );
  }
});

export default localUnitsRouter;
