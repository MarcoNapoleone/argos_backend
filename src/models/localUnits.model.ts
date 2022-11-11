import {query} from '../utils/query';
import {emptyOrRow, emptyOrRows} from "../utils/emptyOrRows";
import {UUID} from "../entities/UUID";
import {Id} from "../entities/Id";

export class LocalUnit {
    id?: Id;
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
    return emptyOrRows(rows)
}

export async function getById(id: Id) {

    const row = await query(`
        SELECT *
        FROM local_units
        WHERE id = ?
    `, [id]);
    return emptyOrRow(row)
}

export async function create(localUnit: LocalUnit) {
    return await query(`
      
    `)
}

export async function update(id: Id, localUnit: LocalUnit) {

    return await query(`
       
    `);
}

export async function logicDelete(id: Id) {

    const now = Date();
    return await query(`
        UPDATE local_units t
        SET t.deleted_at = ${now}
        WHERE t.id = ?;
    `,[id]);
}


