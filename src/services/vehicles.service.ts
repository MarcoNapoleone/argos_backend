import * as vehiclesModel from "../models/vehicles.model";
import {defaultVehicle, Vehicle} from "../models/vehicles.model";
import {getUUID} from "../types/UUID";
import {Id} from "../types/Id";
import {objectFiller} from "../handlers/objects/objectFiller";

export async function getById(id: Id): Promise<Vehicle> {
  return await vehiclesModel.getById(id);
}

export async function create(vehicle: Vehicle): Promise<Vehicle> {
  const _vehicle = Object.assign({}, defaultVehicle, {uuid: getUUID(), ...vehicle})
  const response = await vehiclesModel.create(_vehicle)
  return await vehiclesModel.getById(response.insertId);
}

export async function update(id: Id, vehicle: Vehicle): Promise<Vehicle> {
  const _vehicle: Vehicle = await vehiclesModel.getById(id);

  // updates only new passed fields
  const response = await vehiclesModel.update(id, objectFiller(vehicle, _vehicle))
  return await vehiclesModel.getById(response.insertId);
}

export async function logicDelete(id: Id): Promise<Vehicle> {
  await vehiclesModel.logicDelete(id);
  return {}
}

