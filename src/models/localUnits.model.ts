import {query} from '../utils/query';
import {emptyOrRow, emptyOrRows} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

export class LocalUnit {
    id?: Id;
    uuid?: UUID;
    createdAt?: Date;
    deletedAt?: Date;
    version?: number;
    updatedAt?: Date;
}

export async function getAll(userId: Id, companyId: Id) {
    const rows = await query(`
        SELECT *
        FROM local_units lu
                 INNER JOIN user_company_roles ucr ON ucr.company_id = lu.company_id
        WHERE ucr.user_id = ?
          AND ucr.company_id = ?
    `, [userId, companyId]);
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
    `, [id]);
}


