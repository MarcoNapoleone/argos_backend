import express, {Request, Response} from 'express';
import {DepartmentsController} from "../controllers/departments.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {objectParser} from "../handlers/objects/objectParser";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";

const departmentsRouter = express.Router({mergeParams: true});

/* GET departments/:id - get department by id */
departmentsRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new DepartmentsController();
    const user: User = req.body.user
    const response = await controller.getById(id);
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

/* POST departments/:id - create new department */
departmentsRouter.post('/',
  [
    check("object.name")
      .isLength({min: 3})
      .withMessage("the name must have minimum length of 3")
      .trim(),
  ],
  async (req: Request, res: Response) => {

    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "department",
          message: validationMessage(req)
        })
      );
    }

    try {
      const controller = new DepartmentsController();
      const response = await controller.create(objectParser(req.body.object));
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

/* PUT departments/:id - update department */
departmentsRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new DepartmentsController();
    const response = await controller.update(id, objectParser(req.body.object));
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

/* DELETE departments/:id - logic delete department */
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

/* GET departments - get all departments */
departmentsRouter.get('/:id/hr', async (req: Request, res: Response) => {

  const {params: {id}} = req;
  try {
    const user: User = req.body.user
    const controller = new DepartmentsController();
    const response = await controller.getAllHR(id);
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

/* GET departments - get all departments */
departmentsRouter.get('/:id/equipments', async (req: Request, res: Response) => {

  const {params: {id}} = req;
  try {
    const user: User = req.body.user
    const controller = new DepartmentsController();
    const response = await controller.getAllEquipments(id);
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
