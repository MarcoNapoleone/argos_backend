import * as DepartmentsModel from "../models/departments.model";
import {defaultDepartment, Department, HRDepartment} from "../models/departments.model";
import * as HRModel from "../models/hr.model";
import {HR} from "../models/hr.model";
import {Id} from "../types/Id";
import {getUuid} from "../types/UUID";
import {objectFiller} from "../handlers/objects/objectFiller";
import {Equipment} from "../models/equipments.model";
import {toNumber} from "lodash";


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

export async function getAllHRDepartments(id: Id): Promise<HRDepartment[]> {
  return await DepartmentsModel.getAllHRDepartments(id);
}

export async function addHR(departmentId: Id, hrId: Id, dates: { startDate?: Date, endDate?: Date }): Promise<{ result: boolean, message: string }> {
  const hr: HR = await HRModel.getById(hrId);
  const department: Department = await getById(departmentId);
  const departmentHRs: HRDepartment[] = await getAllHRDepartments(departmentId);

  if (!Object.keys(hr).length
    || !Object.keys(department).length
    || departmentHRs.filter(e => e.hrId === toNumber(hrId) && e.endDate === null).length > 0
  ) {
    return {
      result: false,
      message: "HR or Department not found or an active HR is currently in department"
    }
  }
  await DepartmentsModel.addHR(departmentId, hrId, dates);

  return {
    result: true,
    message: "HR added to department"
  }
}

export async function removeHR(departmentId: Id, hrId: Id): Promise<{ result: boolean, message: string }> {
  const hr: HR = await HRModel.getById(hrId);
  const department: Department = await getById(departmentId);
  const departmentHRs: HRDepartment[] = await getAllHRDepartments(departmentId);

  console.log(departmentHRs.filter(e => e.hrId === toNumber(hrId)))


  if (!Object.keys(hr).length
    || !Object.keys(department).length
    || departmentHRs.filter(e => e.hrId === toNumber(hrId)).length === 0
  ) {
    return {
      result: false,
      message: "HR or Department not found or HR not in department"
    }
  }

  await DepartmentsModel.removeHR(departmentId, hrId);
  return {
    result: true,
    message: "HR removed from department"
  }
}