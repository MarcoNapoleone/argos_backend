import {query} from '../handlers/db/query';
import {emptyOrRow} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";

export class Timetable {
  id?: Id;
  uuid?: UUID;
  name?: string;
  moduleId?: Id;
  date?: Date;
  refId?: Id;
  alert?: boolean;
  closedAt?: Date;
  status?: string;
  companyId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export async function getById(userId: Id, id: Id) {
  const row = await query(`
      SELECT *
      FROM timetables lu
      WHERE lu.id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function create(userId: Id, timetable: Timetable) {
  return await query(`
      INSERT INTO timetables(uuid,
                             name,
                             company_id)
      VALUES (?, ?, ?)
  `, [
    timetable.uuid,
    timetable.name,
    timetable.companyId
  ]);
}

export async function update(userId: Id, id: Id, timetable: Timetable) {
  return await query(`
      UPDATE timetables lu
      SET lu.name       = ?,
          lu.company_id = ?
      WHERE lu.id = ?;
  `, [timetable.name,
    timetable.companyId,
    id
  ]);
}

export async function logicDelete(userId: Id, id: Id) {
  const now = Date();
  return await query(`
      UPDATE timetables t
      SET t.deleted_at = ${now}
      WHERE t.id = ?;
  `, [id]);
}



