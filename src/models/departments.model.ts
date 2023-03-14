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

export interface HRDepartment {
  id?: Id;
  hrId?: Id;
  departmentId?: Id;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM departments d
      WHERE d.id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function create(department: Department) {
  return await query(`
      INSERT INTO departments(uuid,
                              name,
                              local_unit_id)
      VALUES (?, ?, ?)
  `, [
    department.uuid,
    department.name,
    department.localUnitId
  ]);
}

export async function update(id: Id, department: Department) {
  return await query(`
      UPDATE departments d
      SET d.name          = ?,
          d.local_unit_id = ?
      WHERE d.id = ?;
  `, [department.name,
    department.localUnitId,
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

export async function getAllEquipments(id: Id) {
  const rows = await query(`
      SELECT e.*
      FROM equipments e
      WHERE e.department_id = ?
        AND e.deleted_at IS NULL
  `, [id]);
  return emptyOrRows(rows)
}

export async function getAllHRDepartments(id: Id) {
  const rows = await query(`
      SELECT hrd.*
      FROM hr
               join hr_departments hrd on hr.id = hrd.hr_id
               join departments d on d.id = hrd.department_id
      WHERE hrd.department_id = ?
        AND hr.deleted_at IS NULL
        AND d.deleted_at IS NULL
        AND (DATE(hrd.end_date) >= DATE(NOW())
          OR hrd.end_date IS NULL)
  `, [id]);
  return emptyOrRows(rows)
}

export async function addHR(departmentId: Id, hrId: Id, dates: { startDate?: Date, endDate?: Date }) {
  const startDate = dates.startDate ? queryDate(new Date(dates.startDate)) : null;
  const endDate = dates.endDate ? queryDate(new Date(dates.endDate)) : null;

  return await query(`
      INSERT INTO hr_departments(hr_id, department_id, start_date, end_date)
      VALUES (?, ?, ?, ?)
  `, [hrId, departmentId, startDate, endDate]);
}

export async function updateHR(hrDepartmentId: Id, dates: { startDate?: Date, endDate?: Date }) {
  const startDate = dates.startDate ? queryDate(new Date(dates.startDate)) : null;
  const endDate = dates.endDate ? queryDate(new Date(dates.endDate)) : null;

  return await query(`
      UPDATE hr_departments hrd
      SET hrd.start_date = ?,
          hrd.end_date   = ?
      WHERE hrd.id = ?
  `, [startDate, endDate, startDate]);
}

export async function removeHR(departmentId: Id, hrId: Id) {
  const now = queryDate(new Date());
  return await query(`
      UPDATE hr_departments hrd
      SET hrd.end_date = "${now}"
      WHERE hrd.hr_id = ?
        AND hrd.department_id = ?
        AND hrd.end_date IS NULL;
  `, [hrId, departmentId]);
}



