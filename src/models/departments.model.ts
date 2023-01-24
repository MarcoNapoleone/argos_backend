import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

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

export const defaultDepartment: Department = {
  localUnitId: null,
  name: null
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
  const now = queryDate(new Date());
  return await query(`
      UPDATE departments t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}

export async function getAllHR(id: Id) {
  const rows = await query(`
      SELECT hr.*
      FROM hr
               join hr_departments hrd on hr.id = hrd.hr_id
      WHERE hrd.department_id = ?
        AND hr.deleted_at IS NULL
  `, [id]);
  return emptyOrRows(rows)
}

export async function getAllEquipments(id: Id) {
  const rows = await query(`
      SELECT e.*
      FROM equipments e
      WHERE e.department_id = ?
        AND e.deleted_at IS NULL
  `, [id]);
  return emptyOrRows(rows)
}
