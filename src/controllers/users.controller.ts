import {Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags} from "tsoa";
import * as UsersService from "../services/users.service";
import {User} from "../models/users.model";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";

@Route("users")
@Tags("User")
export class UsersController extends Controller {

  @Security("jwt", ["ADMIN"])
  @Get("/")
  async getAll() {
    return await UsersService.getAll()
  }

  @Security("jwt", ["ADMIN"])
  @Get("/:id")
  async getById(@Path() id: Id) {
    return await UsersService.getById(id)
  }

  @Security("jwt", ["ADMIN"])
  @SuccessResponse('201', 'Created')
  @Post("/")
  async create(@Body() user: User) {
    return await UsersService.create(user)
  }

  @Security("jwt", ["ADMIN"])
  @Put("/:id")
  async update(@Path() id: Id | UUID, @Body() user: User) {
    return await UsersService.update(id, user)
  }

  /**
   * Logic delete a user
   */
  @Security("jwt", ["ADMIN"])
  @SuccessResponse("204")
  @Delete("/:id")
  async logicDelete(@Path() id: Id) {
    return await UsersService.logicDelete(id)
  }

}
