import express, {Request, Response} from 'express';
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {objectParser} from "../handlers/objects/objectParser";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";
import {EquipmentsController} from "../controllers/equipments.controller";

const equipmentsRouter = express.Router({mergeParams: true});

/* GET equipments/:id - get equipment by id */
equipmentsRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new EquipmentsController();
    const user: User = req.body.user
    const response = await controller.getById(id);

    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "equipment",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "equipment",
      })
    )
  }
});

/* POST equipments/:id - create new equipment */
equipmentsRouter.post('/',
  [
    check("object.name")
      .isLength({min: 3})
      .withMessage("the name must have minimum length of 3"),
    check("object.departmentId")
      .not().isEmpty()
      .withMessage("department id cannot be empty"),
  ],
  async (req: Request, res: Response) => {


    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "equipment",
          message: validationMessage(req)
        })
      );
    }

    try {
      const controller = new EquipmentsController();
      const response = await controller.create(objectParser(req.body.object));
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(
        formattedResponse({
          status: 500,
          Error: error,
          object: "equipment",
        }))
    }

  });

/* PUT equipments/:id - update equipment */
equipmentsRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new EquipmentsController();
    const response = await controller.update(id, objectParser(req.body.object));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "equipment",
      })
    )
  }
});

/* PUT equipments/:id - logic delete equipment */
equipmentsRouter.delete('/:id', async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new EquipmentsController();
    const response = await controller.logicDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(formattedResponse({
      status: 500,
      object: "equipment",
    }));
  }
});

export default equipmentsRouter;
