import express, {Request, Response} from 'express';
import {CompaniesController} from "../controllers/companies.controller";
import {User} from "../models/users.model";
import {formattedResponse} from "../utils/formattedResponse";
import {isAdmin} from "../middleware/isAdmin.middleware";
import {bodyParser} from "../utils/bodyParser";

const companiesRouter = express.Router();

/* GET companies - get all companies */
companiesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const user: User = req.body.user
        const controller = new CompaniesController();
        const response = await controller.getAll(user.id);
        return res.json(response);
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
        const controller = new CompaniesController();
        const user: User = req.body.user
        const response = await controller.getById(user.id, id);
        if (Object.keys(response).length === 0) {
            return res.status(404).json(
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
companiesRouter.post('/', isAdmin, async (req: Request, res: Response) => {

    try {
        const user: User = req.body.user
        const controller = new CompaniesController();
        const response = await controller.create(user.id, bodyParser(req.body));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "company",
            }))
    }

});

/* PUT companies/:id - update company */
companiesRouter.put('/:id', isAdmin, async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const user: User = req.body.user
        const controller = new CompaniesController();
        const response = await controller.update(user.id, id, bodyParser(req.body));
        res.status(200).json(response);
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
companiesRouter.delete('/:id', isAdmin, async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;


    try {
        const user: User = req.body.user
        const controller = new CompaniesController();
        const response = await controller.logicDelete(user.id, id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                object: "company",
            })
        );
    }
});

/* GET local-units - get all localUnits */
companiesRouter.get('/:id/local-units', async (req: Request, res: Response) => {

    const {params: {id}} = req;
    try {
        const user: User = req.body.user
        const controller = new CompaniesController();
        const response = await controller.getLocalUnits(user.id, id);
        return res.json(response);
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
