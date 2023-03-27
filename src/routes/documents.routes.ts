import express, {Request, Response} from 'express';
import {User} from "../models/users.model";
import {formattedResponse} from "../handlers/http/formattedResponse";
import {processFile} from "../middlewares/upload.middleware";
import {DocumentsController} from "../controllers/documents.controller";
import {check, validationResult} from "express-validator";
import {validationMessage} from "../handlers/http/validationMessage";

const documentsRouter = express.Router({mergeParams: true});

/* GET documents/:id - get document by id */
documentsRouter.get('/:id', async (req: Request, res: Response) => {

  const {params: {id}} = req;

  try {
    const controller = new DocumentsController();
    const user: User = req.body.user
    const response = await controller.getById(id);
    if (Object.keys(response).length === 0) {
      return res.status(404).json(
        formattedResponse({
          status: 404,
          object: "document",
        })
      )
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "document",
      })
    )
  }
});

/* POST documents/ - upload new document */
documentsRouter.post('/',
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
          object: "document",
          message: validationMessage(req)
        })
      );
    }

    try {
      await processFile(req, res);
      if (!req.file) {
        return res.status(400).json(
          formattedResponse({
            status: 400,
            object: "document",
            message: "Please upload a file!"
          })
        );
      }
      const user: User = req.body.user
      const controller = new DocumentsController();

      const response = await controller.create(
        req.file,
        req.query.companyId as string,
        req.query.refId as string,
        req.query.moduleId as string,
        req.body.description
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(
        formattedResponse({
          status: 500,
          Error: error,
          object: "document",
        })
      );
    }

  });

/* PUT documents/:id - update existing document */
documentsRouter.put('/:id', async (req: Request, res: Response) => {

  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new DocumentsController();
    const response = await controller.update(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        Error: error,
        object: "document",
      })
    )
  }
});

/* DELETE documents/:id - logic delete document */
documentsRouter.delete('/:id', async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  if (!id) return;

  try {
    const user: User = req.body.user
    const controller = new DocumentsController();
    const response = await controller.logicDelete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(formattedResponse({
      status: 500,
      object: "document",
    }));
  }
});

/* GET documents/ - get documents by module */
documentsRouter.get('/', async (req: Request, res: Response) => {
  const {
    query: {refId, moduleId},
  } = req;
  if (!refId || !moduleId) return;


  try {
    const user: User = req.body.user
    const controller = new DocumentsController();
    const response = await controller.getByModule(refId as string, moduleId as string);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(
      formattedResponse({
        status: 500,
        object: "document",
      }));
  }
});

export default documentsRouter;
