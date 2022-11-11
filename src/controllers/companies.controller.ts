import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as companiesService from "../services/companies.service";
import {Company} from "../models/companies.model";
import {Id} from "../entities/Id";

@Route("companies")
@Tags("Company")
export class companiesController extends Controller {

    @Security("jwt", [])
    @Get("/")
    async getAll(userId: Id) {
        return await companiesService.getAll(1)
    }

    @Security("jwt", [])
    @Get("/:id")
    async getById(@Path() id: Id) {
        return await companiesService.getById(id)
    }

    @Security("jwt", ["ADMIN"])
    @SuccessResponse('201', 'Created')
    @Post("/")
    async create(@Body() company: Company) {
        return await companiesService.create(company)
    }


    @Security("jwt", ["ADMIN"])
    @Put("/:id")
    async update(@Path() id: Id, @Body() company: Company) {
        return await companiesService.update(id, company)
    }

    /**
     * Logic delete a company
     */
    @Security("jwt", ["ADMIN"])
    @SuccessResponse("204")
    @Delete("/:id")
    async logicDelete(@Path() id: Id) {
        return await companiesService.logicDelete(id)
    }

}
