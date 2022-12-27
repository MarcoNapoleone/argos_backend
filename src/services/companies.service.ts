import * as companiesModel from "../models/companies.model";
import {Company} from "../models/companies.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/Id";
import {LocalUnit} from "../models/localUnits.model";

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

export async function getLocalUnits(userId: Id, id: Id): Promise<LocalUnit[]> {
    return await companiesModel.getLocalUnits(userId, id)
}