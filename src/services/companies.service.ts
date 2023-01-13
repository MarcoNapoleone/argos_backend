import * as CompaniesModel from "../models/companies.model";
import {Company, defaultCompany} from "../models/companies.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/Id";
import {LocalUnit} from "../models/localUnits.model";
import {Department} from "../models/departments.model";
import {Vehicle} from "../models/vehicles.model";
import {Equipment} from "../models/equipments.model";
import {HR} from "../models/hr.model";
import {Document} from "../models/documents.model";
import {Property} from "../models/properties.model";
import {Timetable} from "../models/timetables.model";

export async function getAll(userId: Id): Promise<Company[]> {
  return await CompaniesModel.getAll(userId);
}

export async function getById(userId: Id, id: Id): Promise<Company> {
  return await CompaniesModel.getById(userId, id);
}

export async function create(userId: Id, company: Company): Promise<Company> {
  const _company = Object.assign({}, defaultCompany, {uuid: getUuid(), ...company})
  const response = await CompaniesModel.create(_company)
  return await CompaniesModel.getById(userId, response.insertId);
}

export async function update(userId: Id, id: Id, company: Company): Promise<Company> {
  const _company: Company = await CompaniesModel.getById(userId, id);
  // updates only new passed fields
  const response = await CompaniesModel.update(id, Object.assign({}, _company, company))
  return await CompaniesModel.getById(userId, response.insertId);

}

export async function logicDelete(userId: Id, id: Id): Promise<Company> {
  await CompaniesModel.logicDelete(id);
  return {}
}

export async function getAllLocalUnits(userId: Id, id: Id): Promise<LocalUnit[]> {
  return await CompaniesModel.getAllLocalUnits(userId, id)
}

export async function getAllDepartments(userId: Id, id: Id): Promise<Department[]> {
  return await CompaniesModel.getAllDepartments(userId, id)
}

export async function getAllVehicles(userId: Id, id: Id): Promise<Vehicle[]> {
  return await CompaniesModel.getAllVehicles(userId, id)
}

export async function getAllEquipments(userId: Id, id: Id): Promise<Equipment[]> {
  return await CompaniesModel.getAllEquipments(userId, id)
}

export async function getAllHR(userId: Id, id: Id): Promise<HR[]> {
  return await CompaniesModel.getAllHR(userId, id)
}

export async function getAllProperties(userId: Id, id: Id): Promise<Property[]> {
  return await CompaniesModel.getAllProperties(userId, id)
}

export async function getAllDocuments(userId: Id, id: Id): Promise<Document[]> {
  return await CompaniesModel.getAllDocuments(userId, id)
}

export async function getAllTimetables(userId: Id, id: Id): Promise<Timetable[]> {
  return await CompaniesModel.getAllTimetables(userId, id)
}