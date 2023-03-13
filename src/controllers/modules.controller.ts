import {Controller, Get, Path, Route, Security, Tags} from "tsoa";
import * as ModuleServices from "../services/modules.service";
import {Id} from "../types/Id";

@Route("/modules")
@Tags("Module")
export class ModulesController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await ModuleServices.getById(id)
  }

  @Security("jwt", [])
  @Get("/?name={name}")
  async getByName(@Path() name: string) {
    return await ModuleServices.getByName(name)
  }
}
