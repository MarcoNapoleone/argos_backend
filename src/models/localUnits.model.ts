import {query} from '../utils/query';
import {emptyOrRow, emptyOrRows} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

export class LocalUnit {
    id?: Id;
    uuid?: UUID;
    name?: string;
    email?: string;
    address?: string;
    municipality?: string;
    postalCode?: string;
    phone?: string;
    companyId?: Id;
    createdAt?: Date;
    deletedAt?: Date;
    version?: number;
    updatedAt?: Date;
}

export async function getById(id: Id) {
    const row = await query(`
        SELECT *
        FROM local_units lu
        WHERE lu.id = ?
    `, [id]);
    return emptyOrRow(row)
}

export async function create(localUnit: LocalUnit) {
    return await query(`
        INSERT INTO local_units(uuid,
                                name,
                                company_id)
        VALUES (?, ?, ?)
    `, [
        localUnit.uuid,
        localUnit.name,
        localUnit.companyId
    ]);
}

export async function update(id: Id, localUnit: LocalUnit) {
    return await query(`
        UPDATE local_units lu
        SET lu.name       = ?,
            lu.company_id = ?
        WHERE lu.id = ?;
    `, [localUnit.name,
        localUnit.companyId,
        id
    ]);
}

export async function logicDelete(id: Id) {
    const now = Date();
    return await query(`
        UPDATE local_units t
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


