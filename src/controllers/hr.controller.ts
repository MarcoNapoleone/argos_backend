import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import {HR} from "../models/hr.model";
import * as HRService from "../services/hr.service";
import {Id} from "../types/Id";

@Route("/hr")
@Tags("HR")
export class HRController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await HRService.getById(id)
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() hr: HR) {
    return await HRService.create(hr)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() hr: HR) {
    return await HRService.update(id, hr)
  }

  /**
   * Logic delete a hr
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await HRService.logicDelete(id)
  }

}
