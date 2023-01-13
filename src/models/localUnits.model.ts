import {query} from '../utils/query';
import {emptyOrRow, emptyOrRows} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

export class LocalUnit {
  id?: Id;
  uuid?: UUID;
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
  propertyId?: Id;
  companyId?: Id;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultLocalUnit: LocalUnit = {
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
  `, [id]);
  return emptyOrRow(row)
}

export async function create(localUnit: LocalUnit) {
  console.log(localUnit)
  return await query(`
      INSERT INTO local_units(uuid,
                              name,
                              email,
                              company_id,
                              property_id,
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
    localUnit?.name,
    localUnit?.companyId,
    localUnit?.propertyId,
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
      SET lu.name       = ?,
          lu.company_id = ?
      WHERE lu.id = ?;
  `, [localUnit?.name,
    localUnit?.companyId,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = Date();
  return await query(`
      UPDATE local_units t
      SET t.deleted_at = ${now}
      WHERE t.id = ?;
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

