import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import {Id} from "../types/Id";
import {Timetable} from "../models/timetables.model";
import * as TimetablesService from "../services/timetables.service";


@Route("/timetables")
@Tags("Timetable")
export class TimetablesController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await TimetablesService.getById(id)
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() timetable: Timetable) {
    return await TimetablesService.create(timetable)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() timetable: Timetable) {
    return await TimetablesService.update(id, timetable)
  }

  /**
   * Logic delete a timetable
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await TimetablesService.logicDelete(id)
  }

  @Security("jwt", [])
  @Get("/?refId={refId}&moduleId={moduleId}")
  async getByModule(@Path() refId: Id, @Path() moduleId: Id) {
    return await TimetablesService.getByModule(refId, moduleId)
  }
}

