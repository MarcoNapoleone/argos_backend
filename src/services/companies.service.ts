import * as companiesModel from "../models/companies.model";
import {Company} from "../models/companies.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/Id";

export async function getAll(userId: Id ): Promise<Array<Company> |  {}> {
    return await companiesModel.getAll(userId);
}

export async function getById(userId?: Id, id?: Id): Promise<Company> {
    return await companiesModel.getById(userId, id);
}

export async function create(company: Company): Promise<Company> {

    let _company: Company = {
        uuid: getUuid(), ...company
    }
    const response = await companiesModel.create(_company)
    return companiesModel.getById(response.insertId);
}

export async function update(id: Id, company: Company) :Promise<Company>{
    let _company: Company = await companiesModel.getById(id);

    // updates only new passed fields
    const response = await companiesModel.update(id, Object.assign({}, _company, company))
    return companiesModel.getById(response.insertId);
}

export async function logicDelete(id: Id): Promise<{}>{
    return await companiesModel.logicDelete(id);
}


