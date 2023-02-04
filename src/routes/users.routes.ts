import express, {Request, Response} from 'express';
import {UsersController} from "../controllers/users.controller";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {User} from "../models/users.model";
import {isAdmin} from "../middlewares/isAdmin.middleware";
import {objectParser} from "../handlers/objects/objectParser";

const usersRouter = express.Router();

/* GET users - get all users */
usersRouter.get('/', isAdmin, async (req: Request, res: Response) => {
  const user: User = req.body.user
  try {
    const controller = new UsersController();
    const response = await controller.getAll();
    res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "user",
      })
    );
  }
  return;
});

/* GET users/:id - get user by id */
usersRouter.get('/:id', isAdmin, async (req: Request, res: Response) => {

  const {params: {id}} = req;
  if (!id) return;

  try {
    const controller = new UsersController();
    const response = await controller.getById(id);
    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "user",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "user",
      })
    )
  }
});

/* POST users/:id - create new user */
usersRouter.post('/', isAdmin, async (req: Request, res: Response) => {

  try {
    const controller = new UsersController();
    const response = await controller.create(objectParser(req.body));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "user",
      })
    )
  }

});

/* PUT users/:id - update user */
usersRouter.put('/:id', isAdmin, async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const controller = new UsersController();
    const response = await controller.update(id, objectParser(req.body));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "user",
      })
    )
  }
});

/* DELETE users/:id - logic delete user */
usersRouter.delete('/:id', isAdmin, async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const controller = new UsersController();
    await controller.logicDelete(id);
    res.status(204);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "user",
      })
    )
  }
});

export default usersRouter;
