import express, {Request, Response} from 'express';
import {HRController} from "../controllers/hr.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {objectParser} from "../handlers/objects/objectParser";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";

const hrRouter = express.Router({mergeParams: true});

/* GET hr/:id - get hr by id */
hrRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new HRController();
    const user: User = req.body.user
    const response = await controller.getById(id);
    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "hr",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "hr",
      })
    )
  }
});

/* POST hr/:id - create new hr */
hrRouter.post('/',
  [
    check("object.name")
      .isLength({min: 3})
      .withMessage("the name must have minimum length of 3"),
    check("object.surname")
      .isLength({min: 3})
      .withMessage("the surname must have minimum length of 3"),
    check("object.fiscalCode")
      .isTaxID('it-IT')
      .withMessage("Invalid fiscal code"),
    check("object.phone")
      .isLength({min: 10, max: 10})
      .withMessage("Phone number must have 10 numbers"),
    check("object.email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),
    check("object.postalCode")
      .isLength({min: 5, max: 5})
      .withMessage("Postal code must have 5 numbers")
  ],
  async (req: Request, res: Response) => {

    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "hr",
          message: validationMessage(req)
        })
      );
    }

    try {
      const controller = new HRController();
      const response = await controller.create(objectParser(req.body.object));
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(
        formattedResponse({
          status: 500,
          Error: error,
          object: "hr",
        }))
    }

  });

/* PUT hr/:id - update hr */
hrRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new HRController();
    const response = await controller.update(id, objectParser(req.body.object));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "hr",
      })
    )
  }
});

/* PUT hr/:id - logic delete hr */
hrRouter.delete('/:id', async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new HRController();
    const response = await controller.logicDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(formattedResponse({
      status: 500,
      object: "hr",
    }));
  }
});

export default hrRouter;
