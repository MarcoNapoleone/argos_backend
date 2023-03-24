import * as DocumentsModel from "../models/documents.model";
import {defaultDocument, Document} from "../models/documents.model";
import {getUUID} from "../types/UUID";
import {getTemporaryLink, upload} from "../handlers/db/fileStream";
import {Id} from "../types/Id";

export async function getById(id: Id): Promise<Document> {
  const _document = await DocumentsModel.getById(id);
  if (Object.keys(_document).length === 0)
    return _document;
  return {..._document, path: await getTemporaryLink(_document.path)};
}

export async function create(document: Document, file: Express.Multer.File): Promise<Document> {

  const uuid = getUUID();
  const {path} = await upload('documents', `${uuid}-${file.originalname}`, file);

  const newDocument: Document = {
    uuid,
    path,
    name: file.originalname,
    fileSize: file.size,
    fileType: file.mimetype,
    companyId: document.companyId,
    refId: document.refId,
    moduleId: document.moduleId,
    description: document.description
  }

  const _document = Object.assign({}, defaultDocument, newDocument);
  const response = await DocumentsModel.create(_document);
  return await DocumentsModel.getById(response.insertId);
}

export async function update(id: Id, document: Document): Promise<Document> {
  const _document: Document = await DocumentsModel.getById(id);

  // updates only new passed fields
  const response = await DocumentsModel.update(id, Object.assign({}, _document, document));
  return await DocumentsModel.getById(response.insertId);

}

export async function logicDelete(id: Id): Promise<Document> {
  await DocumentsModel.logicDelete(id);
  return {}
}

export async function getByModule(refId: Id, moduleId: Id,): Promise<Document[]> {
  const rows = await DocumentsModel.getByModule(refId, moduleId);
  for (const row of rows) {
    row.path = await getTemporaryLink(row.path);
  }
  return rows;
}