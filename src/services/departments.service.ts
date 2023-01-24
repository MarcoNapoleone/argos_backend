import * as DepartmentsModel from "../models/departments.model";
import {defaultDepartment, Department} from "../models/departments.model";
import {Id} from "../types/Id";
import {getUuid} from "../types/UUID";
import {objectFiller} from "../handlers/objects/objectFiller";
import {HR} from "../models/hr.model";
import {Equipment} from "../models/equipments.model";


export async function getById(id: Id): Promise<Department> {
  return await DepartmentsModel.getById(id);
}

export async function create(department: Department): Promise<Department> {
  const _department = Object.assign({}, defaultDepartment, {uuid: getUuid(), ...department})
  const response = await DepartmentsModel.create(_department)
  return await DepartmentsModel.getById(response.insertId);
}

export async function update(id: Id, department: Department): Promise<Department> {
  const _department: Department = await DepartmentsModel.getById(id);

  // updates only new passed fields
  const response = await DepartmentsModel.update(id, objectFiller(department, _department))
  return await DepartmentsModel.getById(response.insertId);

}

export async function logicDelete(id: Id): Promise<Department> {
  await DepartmentsModel.logicDelete(id);
  return {}
}

export async function getAllEquipments(id: Id): Promise<Equipment[]> {
  return await DepartmentsModel.getAllEquipments(id);
}

export async function getAllHR(id: Id): Promise<HR[]> {
  return await DepartmentsModel.getAllHR(id);
}