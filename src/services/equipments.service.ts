import * as equipmentsModel from "../models/equipments.model";
import {defaultEquipment, Equipment} from "../models/equipments.model";
import {getUuid} from "../types/UUID";
import {Id} from "../types/Id";
import {objectFiller} from "../handlers/objects/objectFiller";

export async function getById(id: Id): Promise<Equipment> {
  return await equipmentsModel.getById(id);
}

export async function create(equipment: Equipment): Promise<Equipment> {
  const _equipment = Object.assign({}, defaultEquipment, {uuid: getUuid(), ...equipment})
  const response = await equipmentsModel.create(_equipment)
  return await equipmentsModel.getById(response.insertId);
}

export async function update(id: Id, equipment: Equipment): Promise<Equipment> {
  const _equipment: Equipment = await equipmentsModel.getById(id);

  // updates only new passed fields
  const response = await equipmentsModel.update(id, objectFiller(equipment, _equipment))
  return await equipmentsModel.getById(response.insertId);
}

export async function logicDelete(id: Id): Promise<Equipment> {
  await equipmentsModel.logicDelete(id);
  return {}
}

