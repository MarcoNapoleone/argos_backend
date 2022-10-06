import {Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags} from "tsoa";
import * as LocalUnitsService from "../services/localUnits.service";
import {LocalUnit} from "../models/localUnits.model";

@Route("LocalUnits")
@Tags("Local unit")
export class LocalUnitsController extends Controller {

    @Get("/")
    async getAll() {
        return await LocalUnitsService.getAll()
    }

    @Get("/:id")
    async getById(@Path() id: number | string) {
        return await LocalUnitsService.getById(id)
    }

    @SuccessResponse('201', 'Created')
    @Post("/")
    async create(@Body() localUnit: LocalUnit) {
        return await LocalUnitsService.create(localUnit)
    }

    @Put("/:id")
    async update(@Path() id: number | string, @Body() localUnit: LocalUnit) {
        return await LocalUnitsService.update(id, localUnit)
    }

    /**
     * Logic delete a localUnit
     */
    @SuccessResponse("204")
    @Delete("/:id")
    async logicDelete(@Path() id: number | string) {
        return await LocalUnitsService.logicDelete(id)
    }

}
