import * as HRModel from "../models/hr.model";
import {defaultHR, HR} from "../models/hr.model";
import {getUuid} from "../types/UUID";
import {Id} from "../types/Id";
import {objectFiller} from "../handlers/objects/objectFiller";

export async function getById(id: Id): Promise<HR> {
  return await HRModel.getById(id);
}

export async function create(hr: HR): Promise<HR> {
  const _hr = Object.assign({}, defaultHR, {uuid: getUuid(), ...hr})
  const response = await HRModel.create(_hr)
  return await HRModel.getById(response.insertId);
}

export async function update(id: Id, hr: HR): Promise<HR> {
  const _hr: HR = await HRModel.getById(id);

  // updates only new passed fields
  const response = await HRModel.update(id, objectFiller(hr, _hr))
  return await HRModel.getById(response.insertId);
}

export async function logicDelete(id: Id): Promise<HR> {
  await HRModel.logicDelete(id);
  return {}
}

export async function getAllDepartments(id: Id): Promise<HR[]> {
  return await HRModel.getAllDepartments(id);
}