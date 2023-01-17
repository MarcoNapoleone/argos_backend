import {Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, SuccessResponse, Tags} from "tsoa";
import {LocalUnit} from "../models/localUnits.model";
import {Id} from "../types/Id";

@Route("/timetables")
@Tags("Timetable")
export class TimetablesController extends Controller {

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

  /**
   * Logic delete a timetable
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await {}
  }
}

