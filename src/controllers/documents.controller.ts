import {
  Body,
  Controller,
  Delete,
  FormField,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
  Tags,
  UploadedFile
} from "tsoa";
import {Id} from "../types/Id";
import {Document} from "../models/documents.model";
import * as DocumentsService from "../services/documents.service";


@Route("/documents")
@Tags("Document")
export class DocumentsController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await DocumentsService.getById(id)
  }

  @Security("jwt", [])
  @Post("/?companyId={companyId}&refId={refId}&moduleId={moduleId}")
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Path() companyId: Id,
    @Path() refId: Id,
    @Path() moduleId: Id,
    @FormField() description: string
  ) {
    const _document: Document = {
      companyId,
      refId,
      moduleId,
      description
    }
    return await DocumentsService.create(_document, file)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() document: Document) {
    return await DocumentsService.update(id, document)
  }

  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await DocumentsService.logicDelete(id)
  }

  @Security("jwt", [])
  @Get("/?refId={refId}&moduleId={moduleId}")
  async getByModule(@Path() refId: Id, @Path() moduleId: Id) {
    return await DocumentsService.getByModule(refId, moduleId)
  }
}
