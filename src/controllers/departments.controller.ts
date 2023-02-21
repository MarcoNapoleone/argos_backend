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
  @Get("/:id/equipments")
  @Tags("Equipment")
  async getAllEquipments(@Path() id: Id) {
    return await DepartmentService.getAllEquipments(id)
  }

  @Security("jwt", [])
  @Get("/:id/hr")
  @Tags("Department")
  async getAllHRDepartments(@Path() id: Id) {
    return await DepartmentService.getAllHRDepartments(id)
  }

  /**
   * Add HR to department
   * @param departmentId
   * @param hrId
   * @param dates {startDate?: Date, endDate?: Date} - optional
   */
  @Security("jwt", [])
  @Put("/:departmentId/hr/:hrId")
  @Tags("Department", "HR")
  async addHR(@Path() departmentId: Id, @Path() hrId: Id, @Body() dates: { startDate?: Date, endDate?: Date }) {
    return await DepartmentService.addHR(departmentId, hrId, dates)
  }

  /**
   * Remove HR from department
   */
  @Security("jwt", [])
  @Delete("/:departmentId/hr/:hrId")
  @Tags("Department", "HR")
  async removeHR(@Path() departmentId: Id, @Path() hrId: Id) {
    return await DepartmentService.removeHR(departmentId, hrId)
  }

}
