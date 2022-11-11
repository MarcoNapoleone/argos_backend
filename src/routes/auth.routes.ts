import express, {NextFunction, Request, Response} from "express";
import {AuthController} from "../controllers/auth.controller";

const authRouter = express.Router();

/* POST users/login - login user */
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {email, password} = req.body;
        const controller = new AuthController();
        if (!(email && password)) {
            res.status(400).send("All input is required");
            return;
        }
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
authRouter.post('/register', async (req: Request, res: Response) => {

    try {
        const {email, password, name, surname} = req.body;
        const controller = new AuthController();

        if (!(email && password && name && surname)) {
            res.status(400).json({message: "All input is required"});
            return;
        }

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