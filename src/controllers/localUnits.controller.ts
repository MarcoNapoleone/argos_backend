import {Body, Controller, Delete, Get, Path, Post, Put, Request, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as LocalUnitsService from "../services/localUnits.service";
import {LocalUnit} from "../models/localUnits.model";
import {Id} from "../entities/Id";

@Route("/companies/:companyId/local-units")
@Tags("Local unit")
export class LocalUnitsController extends Controller {

    @Security("jwt", [])
    @Get("/")
    async getAll(@Request() userId: Id, @Path() companyId: Id) {
        return await LocalUnitsService.getAll(userId, companyId)
    }

    @Security("jwt", [])
    @Get("/:id")
    async getById(@Path() id: Id) {
        return await LocalUnitsService.getById(id)
    }

    @Security("jwt", [])
    @SuccessResponse('201', 'Created')
    @Post("/")
    async create(@Body() localUnit: LocalUnit) {
        return await LocalUnitsService.create(localUnit)
    }

    @Security("jwt", [])
    @Put("/:id")
    async update(@Path() id: Id, @Body() localUnit: LocalUnit) {
        return await LocalUnitsService.update(id, localUnit)
    }

    /**
     * Logic delete a localUnit
     */
    @Security("jwt", [])
    @SuccessResponse("204")
    @Delete("/:id")
    async logicDelete(@Path() id: Id) {
        return await LocalUnitsService.logicDelete(id)
    }

}
