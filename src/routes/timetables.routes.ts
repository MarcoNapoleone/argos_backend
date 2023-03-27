import express, {Request, Response} from 'express';
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {TimetablesController} from "../controllers/timetables.controller";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";
import {objectParser} from "../handlers/objects/objectParser";

const timetablesRouter = express.Router({mergeParams: true});

/* GET timetables/:id - get timetable by id */
timetablesRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new TimetablesController();
    const user: User = req.body.user
    const response = await controller.getById(id);
    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "timetable",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "timetable",
      })
    )
  }
});

/* POST timetables/ - upload new timetable */
timetablesRouter.post('/',
  [
    check("companyId")
      .not().isEmpty()
      .withMessage('Company id id cannot be empty'),
    check("refId")
      .not().isEmpty()
      .withMessage('Ref id cannot be empty'),
    check("moduleId")
      .not().isEmpty()
      .withMessage('Module id cannot be empty')
  ],
  async (req: Request, res: Response) => {

    if (!validationResult(req).isEmpty()) {
      return res.status(400).json(
        formattedResponse({
          status: 400,
          object: "timetable",
          message: validationMessage(req)
        })
      );
    }

    try {
      const user: User = req.body.user
      const controller = new TimetablesController();
      const response = await controller.create(
        req.query.companyId as string,
        req.query.refId as string,
        req.query.moduleId as string,
        objectParser(req.body.object)
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(
        formattedResponse({
          status: 500,
          Error: error,
          object: "timetable",
        })
      );
    }

  });

/* PUT timetables/:id - update existing timetable */
timetablesRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new TimetablesController();
    const response = await controller.update(id, objectParser(req.body.object));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "timetable",
      })
    )
  }
});

/* DELETE timetables/:id - logic delete timetable */
timetablesRouter.delete('/:id', async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new TimetablesController();
    const response = await controller.logicDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(formattedResponse({
      status: 500,
      object: "timetable",
    }));
  }
});


timetablesRouter.get('/', async (req: Request, res: Response) => {
  const {
    query: {refId, moduleId},
  } = req;
  if (!refId || !moduleId) return;

  try {
    const user: User = req.body.user
    const controller = new TimetablesController();
    const response = await controller.getByModule(refId as string, moduleId as string);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        object: "timetable",
      }));
  }
});

export default timetablesRouter;
