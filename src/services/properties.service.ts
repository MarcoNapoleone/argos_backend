import * as propertiesModel from "../models/properties.model";
import {defaultProperty, Property} from "../models/properties.model";
import {Id} from "../types/Id";
import {getUUID} from "../types/UUID";
import {objectFiller} from "../handlers/objects/objectFiller";


export async function getById(id: Id): Promise<Property> {
  return await propertiesModel.getById(id);
}

export async function create(property: Property): Promise<Property> {
  const _property = Object.assign({}, defaultProperty, {uuid: getUUID(), ...property})
  const response = await propertiesModel.create(_property)
  return await propertiesModel.getById(response.insertId);
}

export async function update(id: Id, property: Property): Promise<Property> {
  const _property: Property = await propertiesModel.getById(id);

  // updates only new passed fields
  const response = await propertiesModel.update(id, objectFiller(property, _property))
  return await propertiesModel.getById(response.insertId);
}

export async function logicDelete(id: Id): Promise<Property> {
  await propertiesModel.logicDelete(id);
  return {}
}