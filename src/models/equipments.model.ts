import {query} from '../handlers/db/query';
import {emptyOrRow} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class Equipment {
  id?: Id;
  uuid?: UUID;
  departmentId?: Id;
  name?: string;
  type?: string;
  brand?: string;
  serialNumber?: string;
  purchaseDate?: Date;
  firstTestDate?: Date;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultEquipment: Equipment = {
  departmentId: null,
  name: null,
  type: null,
  brand: null,
  serialNumber: null,
  purchaseDate: null,
  firstTestDate: null
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM equipments lu
      WHERE lu.id = ?
        AND lu.deleted_at IS NULL
  `, [id]);
  return emptyOrRow(row)
}

export async function create(equipment: Equipment) {
  const purchaseDate = equipment.purchaseDate ? queryDate(new Date(equipment.purchaseDate)) : null;
  const firstTestDate = equipment.firstTestDate ? queryDate(new Date(equipment.firstTestDate)) : null;
  return await query(`
      INSERT INTO equipments(uuid,
                             department_id,
                             name,
                             type,
                             brand,
                             serial_number,
                             purchase_date,
                             first_test_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    equipment.uuid,
    equipment.departmentId,
    equipment.name,
    equipment.type,
    equipment.brand,
    equipment.serialNumber,
    purchaseDate,
    firstTestDate
  ]);
}

export async function update(id: Id, equipment: Equipment) {
  const purchaseDate = equipment.purchaseDate ? `'${queryDate(new Date(equipment.purchaseDate))}'` : null;
  const firstTestDate = equipment.firstTestDate ? `'${queryDate(new Date(equipment.firstTestDate))}'` : null;

  return await query(`
      UPDATE equipments lu
      SET lu.department_id   = ?,
          lu.name            = ?,
          lu.type            = ?,
          lu.brand           = ?,
          lu.serial_number   = ?,
          lu.purchase_date   = ${purchaseDate},
          lu.first_test_date = ${firstTestDate}
      WHERE lu.id = ?;
  `, [
    equipment.departmentId,
    equipment.name,
    equipment.type,
    equipment.brand,
    equipment.serialNumber,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = queryDate(new Date());
  return await query(`
      UPDATE equipments t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}

