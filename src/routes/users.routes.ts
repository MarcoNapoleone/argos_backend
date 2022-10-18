import express, {Request, Response} from 'express';
import {UsersController} from "../controllers/users.controller";

const usersRouter = express.Router();

/* GET users - get all users */
usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const controller = new UsersController();
        const response = await controller.getAll();
        return res.json(response);
    } catch (error) {
        console.error('[users.controller][getAll][error] ', error);
        res.status(500).json({
            message: 'There was an error while fetching the users'
        });
    }
});

/* GET users/:id - get user by id */
usersRouter.get('/:id', async(req: Request, res: Response) => {

    const {params: {id}} = req;
    if (!id) return;

    try {
        const controller = new UsersController();
        const response = await controller.getById(id);
        return res.json(response);
    } catch (error) {
        console.error('[users.controller][getById][error] ', error);
        res.status(500).json({
            message: 'There was an error while fetching the user with id: ' + String(id)
        });
    }
});

/* POST users/:id - create new user */
usersRouter.post('/', async(req: Request, res: Response) => {

    try {
        const controller = new UsersController();
        const response = await controller.create(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error('[users.controller][create][error] ', error);
        res.status(500).json({
            message: 'There was an error while creating the new user'
        });
    }

});

/* PUT users/:id - update user */
usersRouter.put('/:id', async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new UsersController();
        const response = await controller.update(id, req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error('[users.controller][update][error] ', error);
        res.status(500).json({
            message: 'There was an error while updating the user'
        });
    }
});

/* PUT users/:id - logic delete user */
usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new UsersController();
        const response = await controller.logicDelete(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('[users.controller][delete][error] ', error);
        res.status(500).json({
            message: 'There was an error while deleting the user'
        });
    }
});

/* POST users/login - login user */
usersRouter.post('/login', async(req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const controller = new UsersController();
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        return await controller.login({email, password})
            } catch (error) {
        console.error('[users.controller][login][error] ', error);
        res.status(500).json({
            message: 'There was an error while login user'
        });
    }

});

export default usersRouter;
