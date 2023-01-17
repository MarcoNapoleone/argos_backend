import express, {Request, Response} from 'express';
import {DepartmentsController} from "../controllers/departments.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {LocalUnitsController} from "../controllers/localUnits.controller";
import {objectParser} from "../handlers/objects/objectParser";

const departmentsRouter = express.Router({mergeParams: true});

/* GET local-units/:id - get department by id */
departmentsRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new DepartmentsController();
    const user: User = req.body.user
    const response = await controller.getById(user.id, id);
    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "department",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "department",
      })
    )
  }
});

/* POST local-units/:id - create new department */
departmentsRouter.post('/', async (req: Request, res: Response) => {

  try {
    const controller = new DepartmentsController();
    const response = await controller.create(objectParser(req.body));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "department",
      }))
  }

});

/* PUT local-units/:id - update department */
departmentsRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new DepartmentsController();
    const response = await controller.update(id, objectParser(req.body));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "department",
      })
    )
  }
});

/* PUT local-units/:id - logic delete department */
departmentsRouter.delete('/:id', async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new DepartmentsController();
    const response = await controller.logicDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(formattedResponse({
      status: 500,
      object: "department",
    }));
  }
});

/* GET local-units - get all localUnits */
departmentsRouter.get('/:id/hr', async (req: Request, res: Response) => {

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
        object: "department",
      })
    );
  }
});

/* GET local-units - get all localUnits */
departmentsRouter.get('/:id/vehicles', async (req: Request, res: Response) => {

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
        object: "department",
      })
    );
  }
});

export default departmentsRouter;
