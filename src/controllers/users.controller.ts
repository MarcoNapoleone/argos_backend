import {Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags} from "tsoa";
import * as UsersService from "../services/users.service";
import {User} from "../models/users.model";

@Route("Users")
@Tags("User")
export class UsersController extends Controller {

    @Get("/")
    async getAll() {
        return await UsersService.getAll()
    }

    @Get("/:id")
    async getById(@Path() id: number | string) {
        return await UsersService.getById(id)
    }

    @SuccessResponse('201', 'Created')
    @Post("/")
    async create(@Body() user: User) {
        return await UsersService.create(user)
    }

    @Put("/:id")
    async update(@Path() id: number | string, @Body() user: User) {
        return await UsersService.update(id, user)
    }

    /**
     * Logic delete a user
     */
    @SuccessResponse("204")
    @Delete("/:id")
    async logicDelete(@Path() id: number | string) {
        return await UsersService.logicDelete(id)
    }


    @Post("/login")
    async login(@Body() params: { email: string, password: string }) {
        return await UsersService.login(params)
    }

}
