import express, {NextFunction, Request, Response} from "express";
import {AuthController} from "../controllers/auth.controller";
import {body, validationResult} from "express-validator";
import {formattedResponse} from "../utils/formattedResponse";

const authRouter = express.Router();

/* POST users/login - login user */
authRouter.post('/login',
    body('email').isEmail(),
    body('password').not().isEmpty(),
    async (req: Request, res: Response, next: NextFunction) => {

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json(
                formattedResponse({
                    status: 400,
                    object: "authentication",
                    message: 'Missing valid ' + validationResult(req).array()[0].param
                })
            );
        }

        try {
            const {email, password} = req.body;
            const controller = new AuthController();
            const {result, token} = await controller.login({email, password})

            if (!result) {
                res.status(401).json(
                    formattedResponse({
                        status: 401,
                        object: "authentication",
                        message: "Invalid username or password."
                    })
                );
                return;
            }

            res.status(200).json({
                status: 200,
                message: "User login complete.",
                token: token
            });

        } catch (error) {
            res.status(500).json(
                formattedResponse({
                    status: 500,
                    object: "authentication",
                    message: `There was an error while login.`
                }))
        }

    });

/* POST users/register - register user */
authRouter.post('/register',
    body('email').isEmail(),
    body('password').isStrongPassword(),
    body('name').not().isEmpty(),
    body('surname').not().isEmpty(),
    async (req: Request, res: Response) => {

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json(
                formattedResponse({
                    status: 400,
                    object: "authentication",
                    message: 'Missing valid ' + validationResult(req).array()[0].param
                })
            );
        }

        try {
            const {email, password, name, surname} = req.body;
            const controller = new AuthController();


            const result = await controller.register({email, password, name, surname});

            if (!result) {
                return res.status(200).json(
                    formattedResponse({
                        status: 200,
                        object: "authentication",
                        message: `User already registered.`
                    })
                );
            }

            res.status(201).json(
                formattedResponse({
                    status: 201,
                    object: "authentication",
                    message: `User registration complete.`
                })
            );

        } catch (error) {
            res.status(500).json(
                formattedResponse({
                    status: 500,
                    object: "authentication",
                    message: `There was an error while login.`
                }))
        }

    });

export default authRouter;