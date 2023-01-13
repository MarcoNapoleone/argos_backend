import * as timetablesModel from "../models/timetables.model";
import {Timetable} from "../models/timetables.model";
import {getUuid} from "../utils/uuid";
import {Id} from "../entities/Id";


export async function getById(userId: Id, id: Id): Promise<Timetable> {
  return await timetablesModel.getById(userId, id);
}

export async function create(userId: Id, timetable: Timetable): Promise<Timetable> {

  const _timetable: Timetable = {
    uuid: getUuid(), ...timetable
  }
  const response = await timetablesModel.create(userId, _timetable)
  return await timetablesModel.getById(userId, response.insertId);
}

export async function update(userId: Id, id: Id, timetable: Timetable): Promise<Timetable> {
  const _timetable: Timetable = await timetablesModel.getById(userId, id);
  // updates only new passed fields
  const response = await timetablesModel.update(userId, id, Object.assign({}, _timetable, timetable))
  return await timetablesModel.getById(userId, response.insertId);

}

export async function logicDelete(userId: Id, id: Id): Promise<Timetable> {
  await timetablesModel.logicDelete(userId, id);
  return {}
}

