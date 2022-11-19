import {Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as companiesService from "../services/companies.service";
import {Company} from "../models/companies.model";
import {Id} from "../entities/Id";

@Route("companies")
@Tags("Company")
export class companiesController extends Controller {

    @Security("jwt", [])
    @Get("/")
    async getAll(@Request() userId: Id) {
        return await companiesService.getAll(userId)
    }

    @Security("jwt", [])
    @Get("/:id")
    async getById(@Request() userId: Id, @Path() id: Id) {
        return await companiesService.getById(userId, id)
    }

    @Security("jwt", ["ADMIN"])
    @SuccessResponse('201', 'Created')
    @Post("/")
    async create(@Request() userId: Id, @Body() company: Company) {
        return await companiesService.create(userId, company)
    }


    @Security("jwt", ["ADMIN"])
    @Put("/:id")
    async update(@Request() userId: Id, @Path() id: Id, @Body() company: Company) {
        return await companiesService.update(userId, id, company)
    }

    /**
     * Logic delete a company
     */
    @Security("jwt", ["ADMIN"])
    @SuccessResponse("204")
    @Delete("/:id")
    async logicDelete(@Request() userId: Id, @Path() id: Id) {
        return await companiesService.logicDelete(userId, id)
    }

}
