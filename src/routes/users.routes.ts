import express, {Request, Response} from 'express';
import {UsersController} from "../controllers/users.controller";
import {guard} from "../middleware/auth.middleware";
import {formattedResponse} from "../utils/formattedResponse";
import {User} from "../models/users.model";

const usersRouter = express.Router();

/* GET users - get all users */
usersRouter.get('/', guard(["ADMIN"]), async (req: Request, res: Response) => {
    const user: User = req.body.user
    try {
        const controller = new UsersController();
        const response = await controller.getAll();
        res.json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "user",
            })
        );
    }
    return;
});

/* GET users/:id - get user by id */
usersRouter.get('/:id', guard(["ADMIN"]), async (req: Request, res: Response) => {

    const {params: {id}} = req;
    if (!id) return;

    try {
        const controller = new UsersController();
        const response = await controller.getById(id);
        if (response.statusCode === 404) {
            res.status(404).json(
                formattedResponse({
                    status: 404,
                    object: "user",
                })
            )
        }
        return res.json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "user",
            })
        )
    }
});

/* POST users/:id - create new user */
usersRouter.post('/', guard(["ADMIN"]), async (req: Request, res: Response) => {

    try {
        const controller = new UsersController();
        const response = await controller.create(req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "user",
            })
        )
    }

});

/* PUT users/:id - update user */
usersRouter.put('/:id', guard(["ADMIN"]), async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new UsersController();
        const response = await controller.update(id, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "user",
            })
        )
    }
});

/* PUT users/:id - logic delete user */
usersRouter.delete('/:id', guard(["ADMIN"]), async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new UsersController();
        const response = await controller.logicDelete(id);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "user",
            })
        )
    }
});

export default usersRouter;
