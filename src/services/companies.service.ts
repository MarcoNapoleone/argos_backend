import * as companiesModel from "../models/companies.model";
import {Company} from "../models/companies.model";
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
    return await companiesModel.getAll(userId);
}

export async function getById(userId: Id, id: Id): Promise<Company> {
    return await companiesModel.getById(userId, id);
}

export async function create(userId: Id, company: Company): Promise<Company> {

    const _company: Company = {
        uuid: getUuid(), ...company
    }
    const response = await companiesModel.create(_company)
    return await companiesModel.getById(userId, response.insertId);
}

export async function update(userId: Id, id: Id, company: Company): Promise<Company> {
    const _company: Company = await companiesModel.getById(userId, id);
    // updates only new passed fields
    const response = await companiesModel.update(id, Object.assign({}, _company, company))
    return await companiesModel.getById(userId, response.insertId);

}

export async function logicDelete(userId: Id, id: Id): Promise<Company> {
    await companiesModel.logicDelete(id);
    return {}
}

export async function getAllLocalUnits(userId: Id, id: Id): Promise<LocalUnit[]> {
    return await companiesModel.getAllLocalUnits(userId, id)
}

export async function getAllDepartments(userId: Id, id: Id): Promise<Department[]> {
    return await companiesModel.getAllDepartments(userId, id)
}

export async function getAllVehicles(userId: Id, id: Id): Promise<Vehicle[]> {
    return await companiesModel.getAllVehicles(userId, id)
}

export async function getAllEquipments(userId: Id, id: Id): Promise<Equipment[]> {
    return await companiesModel.getAllEquipments(userId, id)
}

export async function getAllHR(userId: Id, id: Id): Promise<HR[]> {
    return await companiesModel.getAllHR(userId, id)
}

export async function getAllProperties(userId: Id, id: Id): Promise<Property[]> {
    return await companiesModel.getAllProperties(userId, id)
}

export async function getAllDocuments(userId: Id, id: Id): Promise<Document[]> {
    return await companiesModel.getAllDocuments(userId, id)
}

export async function getAllTimetables(userId: Id, id: Id): Promise<Timetable[]> {
    return await companiesModel.getAllTimetables(userId, id)
}