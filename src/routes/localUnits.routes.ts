import express, {Request, Response} from 'express';
import {LocalUnitsController} from "../controllers/localUnits.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../utils/formattedResponse";

const localUnitsRouter = express.Router({mergeParams: true});

/* GET localUnits - get all localUnits */
localUnitsRouter.get('/', async (req: Request, res: Response) => {

    const {params: {companyId}} = req;
    try {
        const user: User = req.body.user
        const controller = new LocalUnitsController();
        const response = await controller.getAll(user.id, companyId);
        if (response.statusCode >= 400) {
            return res.status(response.statusCode).json(
                formattedResponse({
                    status: response.statusCode,
                    object: "local unit",
                })
            );
        }
        return res.json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "local unit",
            })
        );
    }
});

/* GET localUnits/:id - get localUnit by id */
localUnitsRouter.get('/:id', async (req: Request, res: Response) => {

    const {params: {id}} = req;
    if (!id) return;

    try {
        const controller = new LocalUnitsController();
        const user: User = req.body.user
        const response = await controller.getById(id);

        if (response.statusCode === 404) {
            res.status(404).json(
                formattedResponse({
                    status: 404,
                    object: "local unit",
                })
            )
        }
        return res.json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "local unit",
            })
        )
    }
});

/* POST localUnits/:id - create new localUnit */
localUnitsRouter.post('/', async (req: Request, res: Response) => {

    try {
        const controller = new LocalUnitsController();
        const response = await controller.create(req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "local unit",
            }))
    }

});

/* PUT localUnits/:id - update localUnit */
localUnitsRouter.put('/:id', async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const user: User = req.body.user
        const controller = new LocalUnitsController();
        const response = await controller.update(id, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "local unit",
            })
        )
    }
});

/* PUT localUnits/:id - logic delete localUnit */
localUnitsRouter.delete('/:id', async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const user: User = req.body.user
        const controller = new LocalUnitsController();
        const response = await controller.logicDelete(id);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(formattedResponse({
            status: 500,
            object: "local unit",
        }));
    }
});

export default localUnitsRouter;
