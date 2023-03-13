import * as ModulesModel from "../models/modules.model";
import {Module} from "../models/modules.model";
import {Id} from "../types/Id";


export async function getAll(): Promise<Module[]> {
  return await ModulesModel.getAll();
}


export async function getById(id: Id): Promise<Module> {
  return await ModulesModel.getById(id);
}

export async function getByName(name: string): Promise<Module> {
  const _name = name.toUpperCase().replace('-', '_');
  return await ModulesModel.getByName(_name);
}