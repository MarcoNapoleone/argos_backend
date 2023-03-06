import * as timetablesModel from "../models/timetables.model";
import {defaultTimetable, Timetable} from "../models/timetables.model";
import {getUUID} from "../types/UUID";
import {Id} from "../types/Id";
import {objectFiller} from "../handlers/objects/objectFiller";


export async function getById(id: Id): Promise<Timetable> {
  return await timetablesModel.getById(id);
}

export async function create(timetable: Timetable): Promise<Timetable> {
  const _timetable = Object.assign({}, defaultTimetable, {uuid: getUUID(), ...timetable})
  const response = await timetablesModel.create(_timetable)
  return await timetablesModel.getById(response.insertId);
}

export async function update(id: Id, timetable: Timetable): Promise<Timetable> {
  const _timetable: Timetable = await timetablesModel.getById(id);

  // updates only new passed fields
  const response = await timetablesModel.update(id, objectFiller(timetable, _timetable))
  return await timetablesModel.getById(response.insertId);

}

export async function logicDelete(id: Id): Promise<Timetable> {
  await timetablesModel.logicDelete(id);
  return {}
}

export async function getByModule(refId: Id, moduleId: Id): Promise<Timetable[]> {
  return await timetablesModel.getByModule(refId, moduleId);
}

