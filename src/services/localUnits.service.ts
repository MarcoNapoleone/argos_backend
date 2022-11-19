import * as LocalUnitsModel from "../models/localUnits.model";
import {LocalUnit} from "../models/localUnits.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/Id";
import {checkPermission} from "./permission.service";
import {ServiceResponse} from "../entities/ServiceResponse";
import HttpStatusCode from "../utils/HttpStatusCode";
import httpStatusCode from "../utils/HttpStatusCode";

interface LocalUnitsServiceResponse extends ServiceResponse {
    data: LocalUnit[];
}

interface LocalUnitServiceResponse extends ServiceResponse {
    data: LocalUnit;
}

export async function getAll(userId: Id, companyId: Id): Promise<LocalUnitsServiceResponse> {
    if (!await checkPermission(userId, companyId, 3, 'READ')) {
        return {
            statusCode: HttpStatusCode.FORBIDDEN,
            data: []
        };
    }
    const localUnits = await LocalUnitsModel.getAll(userId, companyId)
    return {
        statusCode: httpStatusCode.OK,
        data: localUnits
    };
}

export async function getById(id: Id): Promise<LocalUnitServiceResponse> {
    const localUnit = await LocalUnitsModel.getById(id);
    if (Object.keys(localUnit).length === 0) {
        return {
            statusCode: HttpStatusCode.NOT_FOUND,
            data: localUnit
        };
    }
    return {
        statusCode: HttpStatusCode.OK,
        data: localUnit
    };
}

export async function create(localUnit: LocalUnit): Promise<LocalUnitServiceResponse> {

    let _localUnit: LocalUnit = {
        uuid: getUuid(), ...localUnit
    }
    const response = await LocalUnitsModel.create(_localUnit)
    _localUnit = await LocalUnitsModel.getById(response.insertId);
    return {
        statusCode: HttpStatusCode.OK,
        data: _localUnit
    };
}

export async function update(id: Id, localUnit: LocalUnit): Promise<LocalUnitServiceResponse> {
    let _localUnit: LocalUnit = await LocalUnitsModel.getById(id);

    // updates only new passed fields
    const response = await LocalUnitsModel.update(id, Object.assign({}, _localUnit, localUnit))
    _localUnit = await LocalUnitsModel.getById(response.insertId);
    return {
        statusCode: HttpStatusCode.OK,
        data: _localUnit
    };
}

export async function logicDelete(id: Id): Promise<LocalUnitServiceResponse> {
    await LocalUnitsModel.logicDelete(id);
    return {
        statusCode: HttpStatusCode.OK,
        data: {}
    };

}


