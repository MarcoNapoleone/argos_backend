import express, {Request, Response} from 'express';
import {DepartmentsController} from "../controllers/departments.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {objectParser} from "../handlers/objects/objectParser";

const documentsRouter = express.Router({mergeParams: true});

/* GET vehicles/:id - get document by id */
documentsRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new DepartmentsController();
    const user: User = req.body.user
    const response = await controller.getById(id);
    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "document",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "document",
      })
    )
  }
});

/* POST vehicles/:id - create new document */
documentsRouter.post('/', async (req: Request, res: Response) => {

  try {
    const controller = new DepartmentsController();
    const response = await controller.create(objectParser(req.body));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "document",
      }))
  }

});

/* PUT documents/:id - update document */
documentsRouter.put('/:id', async (req: Request, res: Response) => {

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
        object: "document",
      })
    )
  }
});

/* PUT documents/:id - logic delete document */
documentsRouter.delete('/:id', async (req: Request, res: Response) => {
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
      object: "document",
    }));
  }
});

export default documentsRouter;
