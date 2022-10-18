import {Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags} from "tsoa";
import * as companiesService from "../services/companies.service";
import {Company} from "../models/companies.model";
import {Id} from "../utils/query";

@Route("companies")
@Tags("Company")
export class companiesController extends Controller {

    @Get("/")
    async getAll() {
        return await companiesService.getAll(1)
    }

    @Get("/:id")
    async getById(@Path() id: Id) {
        return await companiesService.getById(id)
    }

    @SuccessResponse('201', 'Created')
    @Post("/")
    async create(@Body() company: Company) {
        return await companiesService.create(company)
    }

    @Put("/:id")
    async update(@Path() id: Id, @Body() company: Company) {
        return await companiesService.update(id, company)
    }

    /**
     * Logic delete a company
     */
    @SuccessResponse("204")
    @Delete("/:id")
    async logicDelete(@Path() id: Id) {
        return await companiesService.logicDelete(id)
    }

}
