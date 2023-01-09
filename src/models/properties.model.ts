import {query} from '../utils/query';
import {emptyOrRow} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

export class Property {
    id?: Id;
    uuid?: UUID;
    name?: string;
    address?: string;
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
        FROM properties lu
        WHERE lu.id = ?
    `, [id]);
    return emptyOrRow(row)
}

export async function create(property: Property) {
    return await query(`
        INSERT INTO properties(uuid,
                                name,
                                company_id)
        VALUES (?, ?, ?)
    `, [
        property.uuid,
        property.name,
        property.companyId
    ]);
}

export async function update(id: Id, property: Property) {
    return await query(`
        UPDATE properties lu
        SET lu.name       = ?,
            lu.company_id = ?
        WHERE lu.id = ?;
    `, [property.name,
        property.companyId,
        id
    ]);
}

export async function logicDelete(id: Id) {
    const now = Date();
    return await query(`
        UPDATE properties t
        SET t.deleted_at = ${now}
        WHERE t.id = ?;
    `, [id]);
}
