import {query} from '../utils/query';
import {emptyOrRow, emptyOrRows} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

export class Department {
    id?: Id;
    uuid?: UUID;
    name?: string;
    localUnitId?: Id;
    createdAt?: Date;
    deletedAt?: Date;
    version?: number;
    updatedAt?: Date;
}

export async function getById(id: Id) {
    const row = await query(`
        SELECT *
        FROM departments lu
        WHERE lu.id = ?
    `, [id]);
    return emptyOrRow(row)
}

export async function create(document: Department) {
    return await query(`
        INSERT INTO departments(uuid,
                                name,
                                local_unit_id)
        VALUES (?, ?, ?)
    `, [
        document.uuid,
        document.name,
        document.localUnitId
    ]);
}

export async function update(id: Id, document: Department) {
    return await query(`
        UPDATE departments lu
        SET lu.name          = ?,
            lu.local_unit_id = ?
        WHERE lu.id = ?;
    `, [document.name,
        document.localUnitId,
        id
    ]);
}

export async function logicDelete(id: Id) {
    const now = Date();
    return await query(`
        UPDATE departments t
        SET t.deleted_at = ${now}
        WHERE t.id = ?;
    `, [id]);
}

export async function getDepartments(id: Id) {
    const rows = await query(`
        SELECT *
        FROM departments d
        WHERE d.local_unit_id = ?
    `, [id]);
    return emptyOrRows(rows);
}


