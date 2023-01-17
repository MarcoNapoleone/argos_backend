import {query} from '../handlers/db/query';
import {emptyOrRow} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";

export class Equipment {
  id?: Id;
  uuid?: UUID;
  name?: string;
  departmentId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM equipments lu
      WHERE lu.id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function create(equipment: Equipment) {
  return await query(`
      INSERT INTO equipments(uuid,
                             name,
                             department_id)
      VALUES (?, ?, ?)
  `, [
    equipment.uuid,
    equipment.name,
    equipment.departmentId
  ]);
}

export async function update(id: Id, equipment: Equipment) {
  return await query(`
      UPDATE equipments lu
      SET lu.name          = ?,
          lu.department_id = ?
      WHERE lu.id = ?;
  `, [equipment.name,
    equipment.departmentId,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = Date();
  return await query(`
      UPDATE equipments t
      SET t.deleted_at = ${now}
      WHERE t.id = ?;
  `, [id]);
}

