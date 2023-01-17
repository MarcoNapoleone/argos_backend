import {Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as CompaniesService from "../services/companies.service";
import {Company} from "../models/companies.model";
import {Id} from "../types/Id";

@Route("companies")
@Tags("Company")
export class CompaniesController extends Controller {

  /**
   * Get all companies for a given user
   */
  @Security("jwt", [])
  @Get("/")
  async getAll(@Request() userId: Id) {
    return await CompaniesService.getAll(userId)
  }

  @Security("jwt", [])
  @Get("/:id")
  async getById(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getById(userId, id)
  }

  @Security("jwt", [])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Request() userId: Id, @Body() company: Company) {
    return await CompaniesService.create(userId, company)
  }


  @Security("jwt", [])
  @Put("/:id")
  async update(@Request() userId: Id, @Path() id: Id, @Body() company: Company) {
    return await CompaniesService.update(userId, id, company)
  }

  /**
   * Logic delete a company
   */
  @Security("jwt", [])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.logicDelete(userId, id)
  }

  @Security("jwt", [])
  @Get("/:id/local-units")
  @Tags("Local unit")
  async getAllLocalUnits(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllLocalUnits(userId, id)
  }

  /**/
  @Security("jwt", [])
  @Get("/:id/departments")
  @Tags("Department")
  async getAllDepartments(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllDepartments(userId, id)
  }


  @Security("jwt", [])
  @Get("/:id/vehicles")
  @Tags("Vehicle")
  async getAllVehicles(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllVehicles(userId, id)
  }

  @Security("jwt", [])
  @Get("/:id/equipments")
  @Tags("Equipment")
  async getAllEquipments(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllEquipments(userId, id)
  }


  @Security("jwt", [])
  @Get("/:id/hr")
  @Tags("HR")
  async getAllHR(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllHR(userId, id)
  }

  @Security("jwt", [])
  @Get("/:id/properties")
  @Tags("Property")
  async getAllProperties(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllProperties(userId, id)
  }

  @Security("jwt", [])
  @Get("/:id/documents")
  @Tags("Document")
  async getAllDocuments(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllDocuments(userId, id)
  }

  @Security("jwt", [])
  @Get("/:id/timetables")
  @Tags("Timetable")
  async getAllTimetables(@Request() userId: Id, @Path() id: Id) {
    return await CompaniesService.getAllTimetables(userId, id)
  }

}
