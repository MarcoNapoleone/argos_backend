import {query} from '../utils/query';
import {emptyOrRow} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

export class Document {
  id?: Id;
  uuid?: UUID;
  name?: string;
  companyId?: Id;
  path?: string;
  refId?: Id;
  description?: string;
  moduleId?: Id;
  fileType?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM documents lu
      WHERE lu.id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function create(document: Document) {
  return await query(`
      INSERT INTO documents(uuid,
                            name,
                            company_id)
      VALUES (?, ?, ?)
  `, [
    document.uuid,
    document.name,
    document.companyId
  ]);
}

export async function update(id: Id, document: Document) {
  return await query(`
      UPDATE documents lu
      SET lu.name       = ?,
          lu.company_id = ?
      WHERE lu.id = ?;
  `, [document.name,
    document.companyId,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = Date();
  return await query(`
      UPDATE documents t
      SET t.deleted_at = ${now}
      WHERE t.id = ?;
  `, [id]);
}



