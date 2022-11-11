import express, {NextFunction, Request, Response} from "express";
import {AuthController} from "../controllers/auth.controller";
import {body, validationResult} from "express-validator";

const authRouter = express.Router();

/* POST users/login - login user */
authRouter.post('/login',
    body('email').isEmail(),
    body('password').not().isEmpty(),
    async (req: Request, res: Response, next: NextFunction) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json(
                {
                    message: 'Missing valid ' + validationResult(req).array()[0].param
                }
            );
        }
        try {
            const {email, password} = req.body;
            const controller = new AuthController();
            const {result, token} = await controller.login({email, password})

            if (!result) {
                res.status(403).json({message: "Invalid username or password."});
                return;
            }

            res.status(200).json({
                message: "User login complete.",
                token: token
            });

        } catch (error) {
            console.error('[users.controller][login][error] ', error);
            res.status(500).json({
                message: 'There was an error while login user'
            });
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
                {
                    message: 'Invalid ' + validationResult(req).array()[0].param
                }
            );
        }

        try {
            const {email, password, name, surname} = req.body;
            const controller = new AuthController();


            const result = await controller.register({email, password, name, surname});

            if (!result) {
                res.status(200).json({message: "User already registered."});
                return;
            }

            res.status(201).json({
                message: "User registration complete."
            });

        } catch (error) {
            console.error('[users.controller][register][error] ', error);
            res.status(500).json({
                message: 'There was an error while registering the new user'
            });
        }

    });

export default authRouter;