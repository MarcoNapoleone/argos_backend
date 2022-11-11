import {Body, Controller, Post, Route, Tags} from "tsoa";
import * as AuthService from "../services/auth.service";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {

    @Post("/login")
    async login(@Body() params: { email: string, password: string }) {
        return await AuthService.login(params)
    }

    @Post("/register")
    async register(@Body() params: { email: string, password: string, name: string, surname: string}) {
        return await AuthService.register(params)
    }

}
