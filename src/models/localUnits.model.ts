import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class LocalUnit {
  id?: Id;
  uuid?: UUID;
  propertyId?: Id;
  companyId?: Id;
  name?: string;
  email?: string;
  address?: string;
  municipality?: string;
  province?: string;
  postalCode?: string;
  phone?: string;
  itRea?: string;
  itCodiceAteco?: string;
  itAttivitaPrevalente?: string;
  itCciaa?: string;
  itIsArtigiana?: boolean;
  itIsAgricola?: boolean;
  itResponsabile?: string;
  itDatoreDiLavoro?: string;
  itDirigente?: string;
  itPreposto?: string;
  itRspp?: string;
  itAspp?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultLocalUnit: LocalUnit = {
  companyId: null,
  propertyId: null,
  name: null,
  email: null,
  address: null,
  municipality: null,
  province: null,
  postalCode: null,
  phone: null,
  itRea: null,
  itCodiceAteco: null,
  itAttivitaPrevalente: null,
  itCciaa: null,
  itIsArtigiana: null,
  itIsAgricola: null,
  itResponsabile: null,
  itDatoreDiLavoro: null,
  itDirigente: null,
  itPreposto: null,
  itRspp: null,
  itAspp: null
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM local_units lu
      WHERE lu.id = ?
        AND lu.deleted_at IS NULL
  `, [id]);
  return emptyOrRow(row)
}

export async function create(localUnit: LocalUnit) {
  return await query(`
      INSERT INTO local_units(uuid,
                              company_id,
                              property_id,
                              name,
                              email,
                              address,
                              municipality,
                              province,
                              postal_code,
                              phone,
                              it_rea,
                              it_codice_ateco,
                              it_attivita_prevalente,
                              it_cciaa,
                              it_is_artigiana,
                              it_is_agricola,
                              it_responsabile,
                              it_datore_di_lavoro,
                              it_dirigente,
                              it_preposto,
                              it_rspp,
                              it_aspp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    localUnit?.uuid,
    localUnit?.companyId,
    localUnit?.propertyId,
    localUnit?.name,
    localUnit?.email,
    localUnit?.address,
    localUnit?.municipality,
    localUnit?.province,
    localUnit?.postalCode,
    localUnit?.phone,
    localUnit?.itRea,
    localUnit?.itCodiceAteco,
    localUnit?.itAttivitaPrevalente,
    localUnit?.itCciaa,
    localUnit?.itIsArtigiana,
    localUnit?.itIsAgricola,
    localUnit?.itResponsabile,
    localUnit?.itDatoreDiLavoro,
    localUnit?.itDirigente,
    localUnit?.itPreposto,
    localUnit?.itRspp,
    localUnit?.itAspp
  ]);
}

export async function update(id: Id, localUnit: LocalUnit) {
  return await query(`
      UPDATE local_units lu
      SET lu.property_id            = ?,
          lu.name                   = ?,
          lu.email                  = ?,
          lu.address                = ?,
          lu.municipality           = ?,
          lu.province               = ?,
          lu.postal_code            = ?,
          lu.phone                  = ?,
          lu.it_rea                 = ?,
          lu.it_codice_ateco        = ?,
          lu.it_attivita_prevalente = ?,
          lu.it_cciaa               = ?,
          lu.it_is_artigiana        = ?,
          lu.it_is_agricola         = ?,
          lu.it_responsabile        = ?,
          lu.it_datore_di_lavoro    = ?,
          lu.it_dirigente           = ?,
          lu.it_preposto            = ?,
          lu.it_rspp                = ?,
          lu.it_aspp                = ?
      WHERE lu.id = ?;
  `, [
    localUnit?.propertyId,
    localUnit?.name,
    localUnit?.email,
    localUnit?.address,
    localUnit?.municipality,
    localUnit?.province,
    localUnit?.postalCode,
    localUnit?.phone,
    localUnit?.itRea,
    localUnit?.itCodiceAteco,
    localUnit?.itAttivitaPrevalente,
    localUnit?.itCciaa,
    localUnit?.itIsArtigiana,
    localUnit?.itIsAgricola,
    localUnit?.itResponsabile,
    localUnit?.itDatoreDiLavoro,
    localUnit?.itDirigente,
    localUnit?.itPreposto,
    localUnit?.itRspp,
    localUnit?.itAspp,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = queryDate(new Date());
  return await query(`
      UPDATE local_units lu
      SET lu.deleted_at = "${now}"
      WHERE lu.id = ?;
  `, [id]);
}

export async function getAllDepartments(id: Id) {
  const rows = await query(`
      SELECT *
      FROM departments d
      WHERE d.local_unit_id = ?
  `, [id]);
  return emptyOrRows(rows);
}

export async function getAllVehicles(id: Id) {
  const rows = await query(`
      SELECT *
      FROM vehicles v
      WHERE v.local_unit_id = ?
  `, [id]);
  return emptyOrRows(rows);
}

