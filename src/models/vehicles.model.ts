import {query} from '../handlers/db/query';
import {emptyOrRow} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class Vehicle {
  id?: Id;
  uuid?: UUID;
  hrId?: Id;
  localUnitId?: Id;
  name?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  licensePlate?: string;
  category?: string;
  owner?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultVehicle: Vehicle = {
  hrId: null,
  localUnitId: null,
  name: null,
  brand: null,
  model: null,
  serialNumber: null,
  licensePlate: null,
  category: null,
  owner: null
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM vehicles lu
      WHERE lu.id = ?
        AND lu.deleted_at IS NULL
  `, [id]);
  return emptyOrRow(row)
}

export async function create(vehicle: Vehicle) {
  return await query(`
      INSERT INTO vehicles(uuid,
                           hr_id,
                           local_unit_id,
                           name,
                           brand,
                           model,
                           serial_number,
                           license_plate,
                           category,
                           owner)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    vehicle.uuid,
    vehicle.hrId,
    vehicle.localUnitId,
    vehicle.name,
    vehicle.brand,
    vehicle.model,
    vehicle.serialNumber,
    vehicle.licensePlate,
    vehicle.category,
    vehicle.owner
  ]);
}

export async function update(id: Id, vehicle: Vehicle) {
  return await query(`
      UPDATE vehicles lu
      SET lu.hr_id         = ?,
          lu.local_unit_id = ?,
          lu.name          = ?,
          lu.brand         = ?,
          lu.model         = ?,
          lu.serial_number = ?,
          lu.license_plate = ?,
          lu.category      = ?,
          lu.owner         = ?
      WHERE lu.id = ?;
  `, [
    vehicle.hrId,
    vehicle.localUnitId,
    vehicle.name,
    vehicle.brand,
    vehicle.model,
    vehicle.serialNumber,
    vehicle.licensePlate,
    vehicle.category,
    vehicle.owner,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = queryDate(new Date());
  return await query(`
      UPDATE vehicles t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}



