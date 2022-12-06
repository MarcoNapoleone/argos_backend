import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as LocalUnitsService from "../services/localUnits.service";
import {LocalUnit} from "../models/localUnits.model";
import {Id} from "../entities/Id";

@Route("/local-units")
@Tags("Local unit")
export class LocalUnitsController extends Controller {

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

    @Security("jwt", [])
    @Get("/:id/departments")
    @Tags("Department")
    async getDepartments(@Path() id: Id) {
        return await LocalUnitsService.getDepartments(id)
    }


}
