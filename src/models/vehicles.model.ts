import {query} from '../utils/query';
import {emptyOrRow} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

export class Vehicle {
  id?: Id;
  uuid?: UUID;
  name?: string;
  localUnitId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export async function getById(userId: Id, id: Id) {
  const row = await query(`
      SELECT *
      FROM vehicles lu
      WHERE lu.id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function create(userId: Id, vehicle: Vehicle) {
  return await query(`
      INSERT INTO vehicles(uuid,
                           name,
                           local_unit_id)
      VALUES (?, ?, ?)
  `, [
    vehicle.uuid,
    vehicle.name,
    vehicle.localUnitId
  ]);
}

export async function update(userId: Id, id: Id, vehicle: Vehicle) {
  return await query(`
      UPDATE vehicles lu
      SET lu.name          = ?,
          lu.local_unit_id = ?
      WHERE lu.id = ?;
  `, [vehicle.name,
    vehicle.localUnitId,
    id
  ]);
}

export async function logicDelete(userId: Id, id: Id) {
  const now = Date();
  return await query(`
      UPDATE vehicles t
      SET t.deleted_at = ${now}
      WHERE t.id = ?;
  `, [id]);
}



