import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";
import {query} from "../utils/query";
import {emptyOrRow, emptyOrRows} from "../utils/emptyOrRows";


export class Module {
    id?: Id;
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
        FROM modules
    `);
    return emptyOrRows(rows)
}

export async function getById(id: Id) {
    const row = await query(`
        SELECT *
        FROM modules
        WHERE id = ?
    `, [id]);
    return emptyOrRow(row)
}

export async function getByName(name: string) {
    const row = await query(`
        SELECT *
        FROM modules
        WHERE name like '${name}'
    `);
    return emptyOrRow(row)
}