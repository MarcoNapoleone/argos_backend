import {query} from '../handlers/db/query';
import {emptyOrRow} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class Property {
  id?: Id;
  uuid?: UUID;
  companyId?: Id;
  name?: string;
  address?: string;
  municipality?: string;
  postalCode?: string;
  province?: string;
  country?: string;
  itDestinazioneUso?: string;
  itTitoloUtilizzo?: string;
  itFoglio?: string;
  itParticella?: string;
  itSub?: string;
  itClassamento?: string;
  itClasseEnergetica?: string;
  itConsistenza?: string;
    itRendita?: number;
    createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultProperty: Property = {
  companyId: null,
  name: null,
  address: null,
  municipality: null,
  postalCode: null,
  province: null,
  country: null,
  itDestinazioneUso: null,
  itTitoloUtilizzo: null,
  itFoglio: null,
  itParticella: null,
  itSub: null,
  itClassamento: null,
  itClasseEnergetica: null,
  itConsistenza: null,
  itRendita: null
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM properties p
      WHERE p.id = ?
        AND p.deleted_at IS NULL
  `, [id]);
  return emptyOrRow(row)
}

export async function create(property: Property) {
  return await query(`
      INSERT INTO properties(uuid,
                             company_id,
                             name,
                             address,
                             municipality,
                             postal_code,
                             province,
                             country,
                             it_destinazione_uso,
                             it_titolo_utilizzo,
                             it_foglio,
                             it_particella,
                             it_sub,
                             it_classamento,
                             it_classe_energetica,
                             it_consistenza,
                             it_rendita)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    property.uuid,
    property.companyId,
    property.name,
    property.address,
    property.municipality,
    property.postalCode,
    property.province,
    property.country,
    property.itDestinazioneUso,
    property.itTitoloUtilizzo,
    property.itFoglio,
    property.itParticella,
    property.itSub,
    property.itClassamento,
    property.itClasseEnergetica,
    property.itConsistenza,
    property.itRendita,
  ]);
}

export async function update(id: Id, property: Property) {
  return await query(`
      UPDATE properties p
      SET p.company_id           = ?,
          p.name                 = ?,
          p.address              = ?,
          p.municipality         = ?,
          p.postal_code          = ?,
          p.province             = ?,
          p.country              = ?,
          p.it_destinazione_uso  = ?,
          p.it_titolo_utilizzo   = ?,
          p.it_foglio            = ?,
          p.it_particella        = ?,
          p.it_sub               = ?,
          p.it_classamento       = ?,
          p.it_classe_energetica = ?,
          p.it_consistenza       = ?,
          p.it_rendita           = ?
      WHERE p.id = ?;
  `, [
    property.companyId,
    property.name,
    property.address,
    property.municipality,
    property.postalCode,
    property.province,
    property.country,
    property.itDestinazioneUso,
    property.itTitoloUtilizzo,
    property.itFoglio,
    property.itParticella,
    property.itSub,
    property.itClassamento,
    property.itClasseEnergetica,
    property.itConsistenza,
    property.itRendita,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = queryDate(new Date());
  return await query(`
      UPDATE properties t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}
