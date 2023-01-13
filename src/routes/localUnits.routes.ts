import express, {Request, Response} from 'express';
import {LocalUnitsController} from "../controllers/localUnits.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../utils/formattedResponse";
import {objectParser} from "../middleware/objectParser.middleware";

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
localUnitsRouter.post('/', async (req: Request, res: Response) => {

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
    const response = await controller.update(id, objectParser(req.body));
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
