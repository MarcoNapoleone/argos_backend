import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as DepartmentService from "../services/departments.service";
import {Id} from "../types/Id";
import {Department} from "../models/departments.model";

@Route("/departments")
@Tags("Department")
export class DepartmentsController extends Controller {

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await DepartmentService.getById(id)
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() department: Department) {
    return await DepartmentService.create(department)
  }

  @Security("jwt", [])
  @Put("/:id")
  async update(@Path() id: Id, @Body() department: Department) {
    return await DepartmentService.update(id, department)
  }

  /**
   * Logic delete a department
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await DepartmentService.logicDelete(id)
  }

  @Security("jwt", [])
  @Get("/:id/hr")
  @Tags("Department")
  async getAllHR(@Path() id: Id) {
    return await DepartmentService.getAllHR(id)
  }

  @Security("jwt", [])
  @Get("/:id/equipments")
  @Tags("Equipment")
  async getAllEquipments(@Path() id: Id) {
    return await DepartmentService.getAllEquipments(id)
  }

}
