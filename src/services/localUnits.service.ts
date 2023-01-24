import * as LocalUnitsModel from "../models/localUnits.model";
import {defaultLocalUnit, LocalUnit} from "../models/localUnits.model";
import {getUuid} from "../types/UUID";
import {Id} from "../types/Id";
import {Department} from "../models/departments.model";
import {Vehicle} from "../models/vehicles.model";
import {objectFiller} from "../handlers/objects/objectFiller";


export async function getById(id?: Id): Promise<LocalUnit> {
  return await LocalUnitsModel.getById(id);
}

export async function create(localUnit: LocalUnit): Promise<LocalUnit> {
  const _localUnit = Object.assign({}, defaultLocalUnit, {uuid: getUuid(), ...localUnit})
  const response = await LocalUnitsModel.create(_localUnit)
  return await LocalUnitsModel.getById(response.insertId);
}

export async function update(id: Id, localUnit: LocalUnit): Promise<LocalUnit> {
  const _localUnit: LocalUnit = await LocalUnitsModel.getById(id);

  // updates only new passed fields
  const response = await LocalUnitsModel.update(id, objectFiller(localUnit, _localUnit))
  return await LocalUnitsModel.getById(response.insertId);

}

export async function logicDelete(id: Id): Promise<LocalUnit> {
  await LocalUnitsModel.logicDelete(id);
  return {}
}

export async function getAllDepartments(id: Id): Promise<Department[]> {
  return await LocalUnitsModel.getAllDepartments(id);
}

export async function getAllVehicles(id: Id): Promise<Vehicle[]> {
  return await LocalUnitsModel.getAllVehicles(id);
}
