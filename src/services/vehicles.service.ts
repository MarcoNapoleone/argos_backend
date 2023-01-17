import * as vehiclesModel from "../models/vehicles.model";
import {Vehicle} from "../models/vehicles.model";
import {getUuid} from "../types/UUID";
import {Id} from "../types/Id";


export async function getById(userId: Id, id: Id): Promise<Vehicle> {
  return await vehiclesModel.getById(userId, id);
}

export async function create(userId: Id, vehicle: Vehicle): Promise<Vehicle> {

  const _vehicle: Vehicle = {
    uuid: getUuid(), ...vehicle
  }
  const response = await vehiclesModel.create(userId, _vehicle)
  return await vehiclesModel.getById(userId, response.insertId);
}

export async function update(userId: Id, id: Id, vehicle: Vehicle): Promise<Vehicle> {
  const _vehicle: Vehicle = await vehiclesModel.getById(userId, id);
  // updates only new passed fields
  const response = await vehiclesModel.update(userId, id, Object.assign({}, _vehicle, vehicle))
  return await vehiclesModel.getById(userId, response.insertId);

}

export async function logicDelete(userId: Id, id: Id): Promise<Vehicle> {
  await vehiclesModel.logicDelete(userId, id);
  return {}
}

