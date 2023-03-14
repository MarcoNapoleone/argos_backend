import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class Timetable {
  id?: Id;
  uuid?: UUID;
  companyId?: Id;
  moduleId?: Id;
  refId?: Id;
  name?: string;
  expiringDate?: Date;
  alert?: boolean;
  closedAt?: Date;
  status?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultTimetable: Timetable = {
  companyId: null,
  moduleId: null,
  refId: null,
  name: null,
  expiringDate: null,
  alert: null,
  closedAt: null,
  status: null
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM timetables t
      WHERE t.id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function create(timetable: Timetable) {
  const expiringDate = timetable.expiringDate ? queryDate(new Date(timetable.expiringDate)) : null;
  const closedAt = timetable.closedAt ? queryDate(new Date(timetable.closedAt)) : null;
  return await query(`
      INSERT INTO timetables(uuid,
                             company_id,
                             module_id,
                             ref_id,
                             name,
                             expiring_date,
                             alert,
                             closed_at,
                             status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    timetable.uuid,
    timetable.companyId,
    timetable.moduleId,
    timetable.refId,
    timetable.name,
    expiringDate,
    timetable.alert,
    closedAt,
    timetable.status
  ]);
}

export async function update(id: Id, timetable: Timetable) {
  const expiringDate = timetable.expiringDate ? `'${queryDate(new Date(timetable.expiringDate))}'` : null;
  const closedAt = timetable.closedAt ? `'${queryDate(new Date(timetable.closedAt))}'` : null;

  return await query(`
      UPDATE timetables t
      SET t.company_id    = ?,
          t.module_id     = ?,
          t.ref_id        = ?,
          t.name          = ?,
          t.expiring_date = ${expiringDate},
          t.alert         = ?,
          t.closed_at     = ${closedAt},
          t.status        = ?
      WHERE t.id = ?;
  `, [
    timetable.companyId,
    timetable.moduleId,
    timetable.refId,
    timetable.name,
    timetable.alert,
    timetable.status,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = queryDate(new Date());
  return await query(`
      UPDATE timetables t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}

export async function getByModule(refId: Id, moduleId: Id) {
  const rows = await query(`
      SELECT *
      FROM timetables t
      WHERE t.ref_id = ?
        AND t.module_id = ?
        AND t.deleted_at IS NULL
  `, [refId, moduleId]);
  return emptyOrRows(rows)
}


