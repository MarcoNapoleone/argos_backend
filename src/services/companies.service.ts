import * as companiesModel from "../models/companies.model";
import {Company} from "../models/companies.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/Id";
import {ServiceResponse} from "../entities/ServiceResponse";
import HttpStatusCode from "../utils/HttpStatusCode";

interface CompaniesServiceResponse extends ServiceResponse {
    data: Company[];
}

interface CompanyServiceResponse extends ServiceResponse {
    data: Company;
}

export async function getAll(userId: Id): Promise<CompaniesServiceResponse> {
    const companies = await companiesModel.getAll(userId);
    return {
        statusCode: HttpStatusCode.OK,
        data: companies
    };
}

export async function getById(userId: Id, id: Id): Promise<CompanyServiceResponse> {
    const company = await companiesModel.getById(userId, id);
    if (Object.keys(company).length === 0) {
        return {
            statusCode: HttpStatusCode.NOT_FOUND,
            data: company
        };
    }
    return {
        statusCode: HttpStatusCode.OK,
        data: company
    };
}

export async function create(userId: Id, company: Company): Promise<CompanyServiceResponse> {

    let _company: Company = {
        uuid: getUuid(), ...company
    }
    const response = await companiesModel.create(_company)
    _company = await companiesModel.getById(userId, response.insertId);
    return {
        statusCode: HttpStatusCode.OK,
        data: _company
    };
}

export async function update(userId: Id, id: Id, company: Company): Promise<CompanyServiceResponse> {
    let _company: Company = await companiesModel.getById(userId, id);
    // updates only new passed fields
    const response = await companiesModel.update(id, Object.assign({}, _company, company))
    _company = await companiesModel.getById(userId, response.insertId);
    return {
        statusCode: HttpStatusCode.OK,
        data: _company
    };
}

export async function logicDelete(userId: Id, id: Id): Promise<CompanyServiceResponse> {
    await companiesModel.logicDelete(id);
    return {
        statusCode: HttpStatusCode.OK,
        data: {}
    };
}


