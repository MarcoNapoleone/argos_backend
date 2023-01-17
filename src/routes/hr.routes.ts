import express, {Request, Response} from 'express';
import {HRController} from "../controllers/hr.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {objectParser} from "../handlers/objects/objectParser";

const hrRouter = express.Router({mergeParams: true});

/* GET local-units/:id - get hr by id */
hrRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new HRController();
    const user: User = req.body.user
    const response = await controller.getById(user.id, id);
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

/* POST local-units/:id - create new hr */
hrRouter.post('/', async (req: Request, res: Response) => {

  try {
    const controller = new HRController();
    const response = await controller.create(objectParser(req.body));
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

/* PUT local-units/:id - update hr */
hrRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new HRController();
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

/* PUT local-units/:id - logic delete hr */
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
      object: "local unit",
    }));
  }
});

export default hrRouter;
