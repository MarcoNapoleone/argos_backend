import express, {Request, Response} from 'express';
import {companiesController} from "../controllers/companies.controller";
import {User} from "../models/users.model";

const companiesRouter = express.Router();

/* GET companies - get all companies */
companiesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const controller = new companiesController();
        const user: User = req.body.user
        const response = await controller.getAll(user.id);
        return res.json(response);
    } catch (error) {
        console.error('[companies.controller][getAll][error] ', error);
        res.status(500).json({
            message: 'There was an error while fetching the companies'
        });
    }
});

/* GET companies/:id - get company by id */
companiesRouter.get('/:id', async(req: Request, res: Response) => {

    const {params: {id}} = req;
    if (!id) return;

    try {
        const controller = new companiesController();
        const response = await controller.getById(id);
        return res.json(response);
    } catch (error) {
        console.error('[companies.controller][getById][error] ', error);
        res.status(500).json({
            message: 'There was an error while fetching the company with id: ' + String(id)
        });
    }
});

/* POST companies/:id - create new company */
companiesRouter.post('/', async(req: Request, res: Response) => {

    try {
        const controller = new companiesController();
        const response = await controller.create(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error('[companies.controller][create][error] ', error);
        res.status(500).json({
            message: 'There was an error while creating the new company'
        });
    }

});

/* PUT companies/:id - update company */
companiesRouter.put('/:id', async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new companiesController();
        const response = await controller.update(id, req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error('[companies.controller][update][error] ', error);
        res.status(500).json({
            message: 'There was an error while updating the company'
        });
    }
});

/* PUT companies/:id - logic delete company */
companiesRouter.delete('/:id', async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const controller = new companiesController();
        const response = await controller.logicDelete(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('[companies.controller][delete][error] ', error);
        res.status(500).json({
            message: 'There was an error while deleting the company'
        });
    }
});

export default companiesRouter;
