import express, {Request, Response} from 'express';
import {companiesController} from "../controllers/companies.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../utils/formattedResponse";
import {guard} from "../middleware/auth.middleware";

const companiesRouter = express.Router();

/* GET companies - get all companies */
companiesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const user: User = req.body.user
        const controller = new companiesController();
        const response = await controller.getAll(user.id);
        return res.json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "company",
            })
        );
    }
});

/* GET companies/:id - get company by id */
companiesRouter.get('/:id', async (req: Request, res: Response) => {

    const {params: {id}} = req;
    if (!id) return;

    try {
        const controller = new companiesController();
        const user: User = req.body.user
        const response = await controller.getById(user.id, id);
        if (response.statusCode === 404) {
            res.status(404).json(
                formattedResponse({
                    status: 404,
                    object: "company",
                })
            )
        }
        return res.json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "company",
            })
        )
    }
});

/* POST companies/:id - create new company */
companiesRouter.post('/', guard(["ADMIN"]), async (req: Request, res: Response) => {

    try {
        const user: User = req.body.user
        const controller = new companiesController();
        const response = await controller.create(user.id, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "company",
            }))
    }

});

/* PUT companies/:id - update company */
companiesRouter.put('/:id', guard(["ADMIN"]), async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const user: User = req.body.user
        const controller = new companiesController();
        const response = await controller.update(user.id, id, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "company",
            })
        )
    }
});

/* PUT companies/:id - logic delete company */
companiesRouter.delete('/:id', guard(["ADMIN"]), async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;


    try {
        const user: User = req.body.user
        const controller = new companiesController();
        const response = await controller.logicDelete(user.id, id);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "company",
            })
        );
    }
});

export default companiesRouter;
