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
    return DocumentsService.getById(id)
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
    return DocumentsService.create(_document, file)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() document: Document) {
    return DocumentsService.update(id, document)
  }

  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return DocumentsService.logicDelete(id)
  }
}
