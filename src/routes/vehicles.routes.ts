import express, {Request, Response} from 'express';
import {VehiclesController} from "../controllers/vehicles.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../utils/formattedResponse";
import {bodyParser} from "../utils/bodyParser";

const vehiclesRouter = express.Router({mergeParams: true});

/* GET local-units/:id - get vehicle by id */
vehiclesRouter.get('/:id', async (req: Request, res: Response) => {

    const {params: {id}} = req;

    try {
        const controller = new VehiclesController();
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
                object: "local unit",
            })
        )
    }
});

/* POST local-units/:id - create new vehicle */
vehiclesRouter.post('/', async (req: Request, res: Response) => {

    try {
        const controller = new VehiclesController();
        const response = await controller.create(bodyParser(req.body));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "local unit",
            }))
    }

});

/* PUT local-units/:id - update vehicle */
vehiclesRouter.put('/:id', async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const user: User = req.body.user
        const controller = new VehiclesController();
        const response = await controller.update(id, bodyParser(req.body));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "local unit",
            })
        )
    }
});

/* PUT local-units/:id - logic delete vehicle */
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
            object: "local unit",
        }));
    }
});

export default vehiclesRouter;
