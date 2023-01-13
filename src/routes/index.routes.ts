import express, {Request, Response} from "express";
import {serverStatus} from "../utils/serverStatus";
import {formattedResponse} from "../utils/formattedResponse";

const indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', async (req: Request, res: Response) => {
  const status = await serverStatus()
  if (status) {
    res.status(200).json(
      formattedResponse({
        status: 200,
        object: "server",
      })
    )
  } else {
    res.status(500).json(
      formattedResponse({
        status: 500,
        object: "server",
        message: "Server offline"
      })
    )
  }
});

export default indexRouter;
