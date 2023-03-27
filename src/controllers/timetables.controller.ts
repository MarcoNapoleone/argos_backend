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
  @Post("/?companyId={companyId}&refId={refId}&moduleId={moduleId}")
  @SuccessResponse('201', 'Created')
  async create(
    @Path() companyId: Id,
    @Path() refId: Id,
    @Path() moduleId: Id,
    @Body() timetable: Timetable
  ) {
    const _timetable: Timetable = {
      ...timetable,
      companyId,
      refId,
      moduleId
    }

    return await TimetablesService.create(_timetable)
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

