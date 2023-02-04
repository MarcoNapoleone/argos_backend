import express, {Request, Response} from 'express';
import {VehiclesController} from "../controllers/vehicles.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {objectParser} from "../handlers/objects/objectParser";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";

const vehiclesRouter = express.Router({mergeParams: true});

/* GET vehicles/:id - get vehicle by id */
vehiclesRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new VehiclesController();
    const user: User = req.body.user
    const response = await controller.getById(id);

    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "vehicle",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "vehicle",
      })
    )
  }
});

/* POST vehicles/:id - create new vehicle */
vehiclesRouter.post('/',
  [
    check("object.brand")
      .isLength({min: 3})
      .withMessage("the brand must have minimum length of 3"),
    check("object.name")
      .isLength({min: 3})
      .withMessage("the name must have minimum length of 3"),
    check("object.localUnitId")
      .not().isEmpty()
      .withMessage("local unit id cannot be empty"),
  ],
  async (req: Request, res: Response) => {


    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "vehicle",
          message: validationMessage(req)
        })
      );
    }

    try {
      const controller = new VehiclesController();
      const response = await controller.create(objectParser(req.body.object));
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(
        formattedResponse({
          status: 500,
          Error: error,
          object: "vehicle",
        }))
    }

  });

/* PUT vehicles/:id - update vehicle */
vehiclesRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new VehiclesController();
    const response = await controller.update(id, objectParser(req.body.object));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "vehicle",
      })
    )
  }
});

/* DELETE vehicles/:id - logic delete vehicle */
vehiclesRouter.delete('/:id', async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new VehiclesController();
    const response = await controller.logicDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(formattedResponse({
      status: 500,
      object: "vehicle",
    }));
  }
});

export default vehiclesRouter;
