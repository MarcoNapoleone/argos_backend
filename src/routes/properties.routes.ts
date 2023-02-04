import express, {Request, Response} from 'express';
import {formattedResponse} from "../handlers/http/formattedResponse";
import {User} from "../models/users.model";
import {PropertiesController} from "../controllers/properties.controller";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";
import {objectParser} from "../handlers/objects/objectParser";


const propertiesRoutes = express.Router({mergeParams: true});

/* GET properties/:id - get property by id */
propertiesRoutes.get('/:id', async (req: Request, res: Response) => {

    const {params: {id}} = req;

    try {
        const controller = new PropertiesController();
        const user: User = req.body.user
        const response = await controller.getById(id);

        if (Object.keys(response).length === 0) {
            return res.status(404).json(
                formattedResponse({
                    status: 404,
                    object: "property",
                })
            )
        }
        return res.json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                Error: error,
                object: "property",
            })
        )
    }
});

/* POST properties/:id - create new property */
propertiesRoutes.post('/',
    [
        check("object.name")
            .isLength({min: 3})
            .withMessage("the name must have minimum length of 3"),
        check("object.postalCode")
            .isLength({min: 5, max: 5})
            .withMessage("Postal code must have 5 numbers"),
        check("object.companyId")
            .not().isEmpty()
            .withMessage('Company id cannot be empty'),
    ],
    async (req: Request, res: Response) => {

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json(
                formattedResponse({
                    status: 400,
                    object: "property",
                    message: validationMessage(req),
                })
            )
        }

        try {
            const controller = new PropertiesController();
            const user: User = req.body.user
            const response = await controller.create(req.body.object);

            return res.status(201).json(response);
        } catch (error) {
            res.status(500).json(
                formattedResponse({
                    status: 500,
                    Error: error,
                    object: "property",
                })
            )
        }
    }
);

/* PUT properties/:id - update property by id */
propertiesRoutes.put('/:id', async (req: Request, res: Response) => {

    const {
        params: {id},
    } = req;
    if (!id) return;
    ;

    try {
        const user: User = req.body.user
        const controller = new PropertiesController();
        const response = await controller.update(id, objectParser(req.body.object));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                Error: error,
                object: "property",
            })
        )
    }
});

/* DELETE properties/:id - delete property by id */
propertiesRoutes.delete('/:id', async (req: Request, res: Response) => {
    const {
        params: {id},
    } = req;
    if (!id) return;

    try {
        const user: User = req.body.user
        const controller = new PropertiesController();
        const response = await controller.logicDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            formattedResponse({
                status: 500,
                Error: error,
                object: "property",
            })
        );
    }
});

export default propertiesRoutes;