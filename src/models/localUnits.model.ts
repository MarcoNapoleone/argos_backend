import helper from '../utils/helper';
import {database} from '../utils/database';
import {UUID} from "../utils/uuid";

export class LocalUnit {
    id?: number;
    uuid?: UUID;
    createdAt?: Date;
    deletedAt?: Date;
    version?: number;
    updatedAt?: Date;
}

export async function getAll() {
    const rows = await database(`
        SELECT *
        FROM local_units
    `);
    return helper.emptyOrRows(rows)
}

export async function getById(id: number | string) {

    const row = await database(`
        SELECT *
        FROM local_units
        WHERE id = '${id}'
    `);
    return helper.emptyOrRows(row)
}

export async function create(localUnit: LocalUnit) {
    return await database(`
      
    `)
}

export async function update(id: number | string, localUnit: LocalUnit) {

    return await database(`
       
    `);
}

export async function logicDelete(id: number | string) {

    const now = Date();
    return await database(`
        UPDATE local_units t
        SET t.deleted_at = ${now}
        WHERE t.id = ${id};
    `);
}


