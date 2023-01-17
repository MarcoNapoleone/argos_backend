import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";

export class HR {
  id?: Id;
  uuid?: UUID;
  name?: string;
  surname?: string;
  departmentId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM hr lu
      WHERE lu.id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function create(hr: HR) {
  return await query(`
      INSERT INTO hr(uuid,
                     name,
                     surname)
      VALUES (?, ?, ?)
  `, [
    hr.uuid,
    hr.name,
    hr.surname
  ]);
}

export async function update(id: Id, hr: HR) {
  return await query(`
      select *
      from hr;
  `, []);
}

export async function logicDelete(id: Id) {
  const now = Date();
  return await query(`
      UPDATE hr t
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


