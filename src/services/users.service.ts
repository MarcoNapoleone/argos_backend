import * as UsersModel from "../models/users.model";
import {User} from "../models/users.model";
import {getUuid, UUID} from "../utils/uuid";
import {Id} from "../entities/Id";
import {ServiceResponse} from "../entities/ServiceResponse";
import HttpStatusCode from "../utils/HttpStatusCode";

interface UserServiceResponse extends ServiceResponse {
    data: User;
}

interface UsersServiceResponse extends ServiceResponse {
    data: User[];
}

export async function getAll(): Promise<UsersServiceResponse> {
    const users = await UsersModel.getAll()
    return {
        statusCode: HttpStatusCode.OK,
        data: users
    };
}

export async function getById(id: Id): Promise<UserServiceResponse> {
    const user = await UsersModel.getById(id)
    if (Object.keys(user).length === 0) {
        return {
            statusCode: HttpStatusCode.NOT_FOUND,
            data: user
        };
    }
    return {
        statusCode: HttpStatusCode.OK,
        data: user
    };
}

export async function getByUUID(uuid: UUID): Promise<UserServiceResponse> {
    const user = await UsersModel.getByUUID(uuid);
    if (Object.keys(user).length === 0) {
        return {
            statusCode: HttpStatusCode.NOT_FOUND,
            data: user
        };
    }
    return {
        statusCode: HttpStatusCode.OK,
        data: user
    };
}

export async function findOne(param: string, value: string | number): Promise<UserServiceResponse> {
    const user = await UsersModel.findOne(param, value);
    if (Object.keys(user).length === 0) {
        return {
            statusCode: HttpStatusCode.NOT_FOUND,
            data: user
        };
    }
    return {
        statusCode: HttpStatusCode.OK,
        data: user
    };
}

export async function create(user: User): Promise<UserServiceResponse> {

    let _user: User = {
        uuid: getUuid(),
        ...user
    }
    const response = await UsersModel.create(_user)
    _user = await UsersModel.getById(response.insertId);
    return {
        statusCode: HttpStatusCode.OK,
        data: _user
    };
}

export async function update(id: Id, user: User): Promise<UserServiceResponse> {
    let _user: User = await UsersModel.getById(id);
    // updates only new passed fields
    const response = await UsersModel.update(id, Object.assign({}, _user, user))
    _user = await UsersModel.getById(response.insertId);
    return {
        statusCode: HttpStatusCode.OK,
        data: _user
    };
}

export async function logicDelete(id: Id): Promise<UserServiceResponse> {
    await UsersModel.logicDelete(id);
    return {
        statusCode: HttpStatusCode.OK,
        data: {}
    };
}


