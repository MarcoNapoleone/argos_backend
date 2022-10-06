import * as companiesModel from "../models/companies.model";
import {Company} from "../models/companies.model";
import {getUuid} from "../utils/uuid";

export async function getAll(): Promise<Array<Company>> {
    return await companiesModel.getAll();
}

export async function getById(id: number | string): Promise<Company> {
    return await companiesModel.getById(id);
}

export async function create(company: Company): Promise<Company> {

    let _company: Company = {
        uuid: getUuid(), ...company
    }
    const response = await companiesModel.create(_company)
    return companiesModel.getById(response.insertId);
}

export async function update(id: number | string, company: Company) :Promise<Company>{
    let _company: Company = await companiesModel.getById(id);

    // updates only new passed fields
    const response = await companiesModel.update(id, Object.assign({}, _company, company))
    return companiesModel.getById(response.insertId);
}

export async function logicDelete(id: number | string): Promise<{}>{
    return await companiesModel.logicDelete(id);
}


