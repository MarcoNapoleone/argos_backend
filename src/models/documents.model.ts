import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class Document {
  id?: Id;
  uuid?: UUID;
  name?: string;
  companyId?: Id;
  // relative path from folder
  path?: string;
  refId?: Id;
  moduleId?: Id;
  description?: string;
  fileType?: string;
  fileSize?: number;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultDocument: Document = {
  companyId: null,
  name: null,
  path: null,
  refId: null,
  description: null,
  moduleId: null,
  fileType: null,
  fileSize: null,
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
                            company_id,
                            path,
                            ref_id,
                            description,
                            module_id,
                            file_type,
                            file_size)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    document.uuid,
    document.name,
    document.companyId,
    document.path,
    document.refId,
    document.description,
    document.moduleId,
    document.fileType,
    document.fileSize,
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
  const now = queryDate(new Date());
  return await query(`
      UPDATE documents t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}

export async function getByModule(refId: Id, moduleId: Id) {
  const rows = await query(`
      SELECT *
      FROM documents d
      WHERE d.module_id = ?
        AND d.ref_id = ?
        AND d.deleted_at IS NULL
  `, [refId, moduleId]);
  return emptyOrRows(rows)
}

