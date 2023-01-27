import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import {Equipment} from "../models/equipments.model";
import * as EquipmentsServices from "../services/equipments.service";
import {Id} from "../types/Id";

@Route("/equipments")
@Tags("Equipment")
export class EquipmentsController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await EquipmentsServices.getById(id)
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() equipment: Equipment) {
    return await EquipmentsServices.create(equipment)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() equipment: Equipment) {
    return await EquipmentsServices.update(id, equipment)
  }

  /**
   * Logic delete a equipment
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await EquipmentsServices.logicDelete(id)
  }
}
