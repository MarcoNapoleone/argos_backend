import helper from '../utils/helper';
import {Id, query} from '../utils/query';
import {UUID} from "../utils/uuid";


export class Company {
    id?: number;
    uuid?: UUID;
    name?: string;
    createdAt?: Date;
    deletedAt?: Date;
    version?: number;
    updatedAt?: Date;
}

export async function getAll(userId: Id) {

    const rows = await query(`
        SELECT *
        FROM companies
        WHERE id IN (SELECT uc.company_id
                     FROM user_company uc
                              INNER JOIN companies c ON uc.company_id = c.id
                     WHERE uc.user_id = ?)
    `, [userId]);
    return helper.emptyOrRows(rows)
}

export async function getById(id: Id) {

    const row = await query(`
        SELECT *
        FROM companies
        WHERE id = ?
    `, [id]);
    return helper.emptyOrRows(row)
}

export async function create(company: Company) {
    return await query(`
    `)
}

export async function update(id: Id, company: Company) {

    return await query(`
        
    `);
}

export async function logicDelete(id: Id) {

    const now = Date();
    return await query(`
        UPDATE companies t
        SET t.deleted_at = ${now}
        WHERE t.id = ?;
    `, [id]);
}


