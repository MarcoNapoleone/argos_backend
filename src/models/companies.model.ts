import helper from '../utils/helper';
import {query} from '../utils/query';
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

export async function getAll() {
    const rows = await query(`
        SELECT *
        FROM companies
    `);
    return helper.emptyOrRows(rows)
}

export async function getById(id: number | string) {

    const row = await query(`
        SELECT *
        FROM companies
        WHERE id = '${id}'
    `);
    return helper.emptyOrRows(row)
}

export async function create(company: Company) {
    return await query(`
    `)
}

export async function update(id: number | string, company: Company) {

    return await query(`
        
    `);
}

export async function logicDelete(id: number | string) {

    const now = Date();
    return await query(`
        UPDATE companies t
        SET t.deleted_at = ${now}
        WHERE t.id = ${id};
    `);
}


