import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import {Property} from "../models/properties.model";
import * as PropertiesServices from "../services/properties.service";
import {Id} from "../types/Id";

@Route("/properties")
@Tags("Property")
export class PropertiesController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await PropertiesServices.getById(id)
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() property: Property) {
    return await PropertiesServices.create(property)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() property: Property) {
    return await PropertiesServices.update(id, property)
  }

  /**
   * Logic delete a property
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await PropertiesServices.logicDelete(id)
  }
}
