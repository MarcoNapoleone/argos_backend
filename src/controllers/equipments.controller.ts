import {Body, Controller, Get, Path, Post, Put, Request, Route, Security, SuccessResponse, Tags} from "tsoa";
import {LocalUnit} from "../models/localUnits.model";
import {Id} from "../entities/Id";

@Route("/equipments")
@Tags("Equipment")
export class EquipmentsController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Request() userId: Id, @Path() id: Id) {
    return {}
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() localUnit: LocalUnit) {
    return {}
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() localUnit: LocalUnit) {
    return {}
  }

}
