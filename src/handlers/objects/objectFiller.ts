import {objectParser} from "./objectParser";

export const objectFiller = (object: any, defaultObject: any) => {

  const _object = Object.assign({}, defaultObject, object);
  return objectParser(_object);
}