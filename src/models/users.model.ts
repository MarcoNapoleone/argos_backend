import helper from '../utils/helper';
import {Id, query} from '../utils/query';
import {UUID} from "../utils/uuid";
import {IsDate, IsEmail, IsLowercase, IsUUID} from "class-validator";

export class User {

    id?: number;

    @IsUUID()
    uuid?: UUID;

    name?: string;

    surname?: string;

    @IsEmail()
    @IsLowercase()
    email?: string;

    password?: string;

    roleId?: number;

    @IsDate()
    createdAt?: Date;

    @IsDate()
    deletedAt?: Date;

    version?: number;

    @IsDate()
    updatedAt?: Date;
}

export async function getAll() {
    const rows = await query(`
        SELECT *
        FROM users
    `);
    return helper.emptyOrRows(rows)
}

export async function getById(id: Id) {

    const row = await query(`
        SELECT *
        FROM users
        WHERE id = ?
    `, [id]);
    return helper.emptyOrRows(row)
}

export async function findOne(param: string, value: string | number) {

    const row = await query(`
        SELECT *
        FROM users
        WHERE ? = ?
    `, [param, value]);
    return helper.emptyOrRows(row)
}

export async function create(user: User) {
    return await query(`
        INSERT INTO users(uuid,
                          name,
                          surname,
                          email,
                          password,
                          role_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [
        user?.uuid,
        user?.name,
        user?.surname,
        user?.email,
        user?.password,
        user?.roleId
    ])
}

export async function update(id: Id, user: User) {

    return await query(`
        UPDATE users t
        SET t.name    = ?,
            t.surname = ?,
            t.email   = ?,
            t.role_id = ?
        WHERE t.id = ?;
    `, [
        user.name,
        user.surname,
        user.email,
        user.roleId,
        id
    ]);
}

export async function logicDelete(id: Id) {

    const now = Date();
    return await query(`
        UPDATE users t
        SET t.deleted_at = ?
        WHERE t.id = ?;
    `, [now, id]);
}


