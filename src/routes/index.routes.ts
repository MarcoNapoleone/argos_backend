import express, {Request, Response} from "express";
import {serverStatus} from "../utils/serverStatus";

const indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', async  (req: Request, res: Response)  => {
    const status = await serverStatus()
    return res.json({status: status})
});

export default indexRouter;
