import helper from '../utils/helper';
import {query} from '../utils/query';
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
    const rows = await query(`
        SELECT *
        FROM local_units
    `);
    return helper.emptyOrRows(rows)
}

export async function getById(id: number | string) {

    const row = await query(`
        SELECT *
        FROM local_units
        WHERE id = '${id}'
    `);
    return helper.emptyOrRows(row)
}

export async function create(localUnit: LocalUnit) {
    return await query(`
      
    `)
}

export async function update(id: number | string, localUnit: LocalUnit) {

    return await query(`
       
    `);
}

export async function logicDelete(id: number | string) {

    const now = Date();
    return await query(`
        UPDATE local_units t
        SET t.deleted_at = ${now}
        WHERE t.id = ${id};
    `);
}


