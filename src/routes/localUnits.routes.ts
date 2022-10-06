import express, {Request, Response} from 'express';
import {LocalUnitsController} from "../controllers/localUnits.controller";

const localUnitsRouter = express.Router();

/* GET localUnits - get all localUnits */
localUnitsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const controller = new LocalUnitsController();
        const response = await controller.getAll();
        return res.json(response);
    } catch (error) {
        console.error('[localUnits.controller][getAll][error] ', error);
        res.status(500).json({
            message: 'There was an error while fetching the localUnits'
        });
    }
});

/* GET localUnits/:id - get localUnit by id */
localUnitsRouter.get('/:id', async(req: Request, res: Response) => {

    const {params: {id}} = req;
    if (!id) return;

    try {
        const controller = new LocalUnitsController();
        const response = await controller.getById(id);
        return res.json(response);
    } catch (error) {
        console.error('[localUnits.controller][getById][error] ', error);
        res.status(500).json({
            message: 'There was an error while fetching the localUnit with id: ' + String(id)
        });
    }
});

/* POST localUnits/:id - create new localUnit */
localUnitsRouter.post('/', async(req: Request, res: Response) => {

    try {
        const controller = new LocalUnitsController();
        const response = await controller.create(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error('[localUnits.controller][create][error] ', error);
        res.status(500).json({
            message: 'There was an error while creating the new localUnit'
        });
    }

});

/* PUT localUnits/:id - update localUnit */
localUnitsRouter.put('/:id', async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new LocalUnitsController();
        const response = await controller.update(id, req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error('[localUnits.controller][update][error] ', error);
        res.status(500).json({
            message: 'There was an error while updating the localUnit'
        });
    }
});

/* PUT localUnits/:id - logic delete localUnit */
localUnitsRouter.delete('/:id', async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new LocalUnitsController();
        const response = await controller.logicDelete(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('[localUnits.controller][delete][error] ', error);
        res.status(500).json({
            message: 'There was an error while deleting the localUnit'
        });
    }
});

export default localUnitsRouter;
