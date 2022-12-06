import * as LocalUnitsModel from "../models/localUnits.model";
import {LocalUnit} from "../models/localUnits.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/Id";


export async function getById(id?: Id): Promise<LocalUnit> {
    return await LocalUnitsModel.getById(id);
}

export async function create(localUnit: LocalUnit): Promise<LocalUnit> {

    let _localUnit: LocalUnit = {
        uuid: getUuid(), ...localUnit
    }
    const response = await LocalUnitsModel.create(_localUnit)
    return await LocalUnitsModel.getById(response.insertId);

}

export async function update(id: Id, localUnit: LocalUnit): Promise<LocalUnit> {
    let _localUnit: LocalUnit = await LocalUnitsModel.getById(id);

    // updates only new passed fields
    const response = await LocalUnitsModel.update(id, Object.assign({}, _localUnit, localUnit))
    return await LocalUnitsModel.getById(response.insertId);

}

export async function logicDelete(id: Id): Promise<LocalUnit> {
    await LocalUnitsModel.logicDelete(id);
    return {}
}

export async function getDepartments(id: Id): Promise<LocalUnit> {
    return await LocalUnitsModel.getDepartments(id);
}
