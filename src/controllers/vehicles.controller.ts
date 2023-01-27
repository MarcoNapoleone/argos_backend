import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as VehiclesServices from "../services/vehicles.service";
import {Id} from "../types/Id";
import {Vehicle} from "../models/vehicles.model";

@Route("/vehicles")
@Tags("Vehicle")
export class VehiclesController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await VehiclesServices.getById(id)
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() vehicle: Vehicle) {
    return await VehiclesServices.create(vehicle)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() vehicle: Vehicle) {
    return await VehiclesServices.update(id, vehicle)
  }

  /**
   * Logic delete a vehicle
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await VehiclesServices.logicDelete(id)
  }

}
