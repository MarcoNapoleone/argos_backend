import express, {Request, Response} from 'express';
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {ModulesController} from "../controllers/modules.controller";

const modulesRouter = express.Router({mergeParams: true});


/* GET modules/:id - get module by id */
modulesRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new ModulesController();
    const user: User = req.body.user
    const response = await controller.getById(id);

    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "module",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "module",
      })
    )
  }
});

modulesRouter.get('/', async (req: Request, res: Response) => {
  const {
    query: {name},
  } = req;
  if (!name) return;
  try {
    const controller = new ModulesController();
    const user: User = req.body.user
    const response = await controller.getByName(name as string);

    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "module",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "module",
      })
    )
  }
});


export default modulesRouter;
