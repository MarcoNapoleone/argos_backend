import * as UsersModel from "../models/users.model";
import {User} from "../models/users.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/enums";

export async function getAll(): Promise<Array<User> | {}> {
    return await UsersModel.getAll();
}

export async function getById(id: Id): Promise<User> {
    return await UsersModel.getById(id);
}

export async function findOne(param: string, value: string | number): Promise<User> {
    return await UsersModel.findOne(param, value);
}

export async function create(user: User): Promise<User> {

    let _user: User = {
        uuid: getUuid(),
        ...user
    }
    const response = await UsersModel.create(_user)
    return UsersModel.getById(response.insertId);
}

export async function update(id: Id, user: User): Promise<User> {
    let _user: User = await UsersModel.getById(id);

    // updates only new passed fields
    const response = await UsersModel.update(id, Object.assign({}, _user, user))
    return UsersModel.getById(response.insertId);
}

export async function logicDelete(id: Id): Promise<{}> {
    return await UsersModel.logicDelete(id);
}


