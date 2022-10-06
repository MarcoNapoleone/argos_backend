import * as LocalUnitsModel from "../models/localUnits.model";
import {LocalUnit} from "../models/localUnits.model";
import {getUuid} from "../utils/uuid";

export async function getAll(): Promise<Array<LocalUnit>> {
    return await LocalUnitsModel.getAll();
}

export async function getById(id: number | string): Promise<LocalUnit> {
    return await LocalUnitsModel.getById(id);
}

export async function create(localUnit: LocalUnit): Promise<LocalUnit> {

    let _localUnit: LocalUnit = {
        uuid: getUuid(), ...localUnit
    }
    const response = await LocalUnitsModel.create(_localUnit)
    return LocalUnitsModel.getById(response.insertId);
}

export async function update(id: number | string, localUnit: LocalUnit) :Promise<LocalUnit>{
    let _localUnit: LocalUnit = await LocalUnitsModel.getById(id);

    // updates only new passed fields
    const response = await LocalUnitsModel.update(id, Object.assign({}, _localUnit, localUnit))
    return LocalUnitsModel.getById(response.insertId);
}

export async function logicDelete(id: number | string): Promise<{}>{
    return await LocalUnitsModel.logicDelete(id);
}

