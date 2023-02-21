import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class HR {
  id?: Id;
  uuid?: UUID;
  companyId?: Id;
  name?: string;
  surname?: string;
  fiscalCode?: string;
  email?: string;
  phone?: string;
  birthPlace?: string;
  birthDate?: Date;
  nationality?: string;
  recruitmentDate?: Date;
  contractQualification?: string;
  contractLevel?: string;
  duty?: string;
  isApprentice?: boolean;
  isProfessional?: boolean;
  isItOrganigrammaSicurezza?: boolean;
  itCcnl?: string;
  address?: string;
  municipality?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultHR: HR = {
  name: null,
  surname: null,
  fiscalCode: null,
  email: null,
  phone: null,
  birthPlace: null,
  birthDate: null,
  nationality: null,
  recruitmentDate: null,
  contractQualification: null,
  contractLevel: null,
  duty: null,
  isApprentice: null,
  isProfessional: null,
  isItOrganigrammaSicurezza: null,
  itCcnl: null,
  address: null,
  municipality: null,
  province: null,
  postalCode: null,
  country: null
}

export async function getById(id: Id) {
  const row = await query(`
      SELECT *
      FROM hr lu
      WHERE lu.id = ?
        AND lu.deleted_at IS NULL
  `, [id]);
  return emptyOrRow(row)
}

export async function create(hr: HR) {
  const birthDate = hr.birthDate ? queryDate(new Date(hr.birthDate)) : null;
  const recruitmentDate = hr.recruitmentDate ? queryDate(new Date(hr.recruitmentDate)) : null;
  return await query(`
      INSERT INTO hr(uuid,
                     company_id,
                     name,
                     surname,
                     fiscal_code,
                     email,
                     phone,
                     birth_date,
                     birth_place,
                     nationality,
                     recruitment_date,
                     contract_qualification,
                     contract_level,
                     duty,
                     is_apprentice,
                     is_professional,
                     is_it_organigramma_sicurezza,
                     it_ccnl,
                     address,
                     municipality,
                     province,
                     postal_code,
                     country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    hr.uuid,
    hr.companyId,
    hr.name,
    hr.surname,
    hr.fiscalCode,
    hr.email,
    hr.phone,
    birthDate,
    hr.birthPlace,
    hr.nationality,
    recruitmentDate,
    hr.contractQualification,
    hr.contractLevel,
    hr.duty,
    hr.isApprentice,
    hr.isProfessional,
    hr.isItOrganigrammaSicurezza,
    hr.itCcnl,
    hr.address,
    hr.municipality,
    hr.province,
    hr.postalCode,
    hr.country
  ]);
}

export async function update(id: Id, hr: HR) {
  const birthDate = hr.birthDate ? `'${queryDate(new Date(hr.birthDate))}'` : null;
  const recruitmentDate = hr.recruitmentDate ? `'${queryDate(new Date(hr.recruitmentDate))}'` : null;
  return await query(`
      UPDATE hr t
      SET t.name                         = ?,
          t.surname                      = ?,
          t.fiscal_code                  = ?,
          t.email                        = ?,
          t.phone                        = ?,
          t.birth_place                  = ?,
          t.birth_date                   = ${birthDate},
          t.nationality                  = ?,
          t.recruitment_date             = ${recruitmentDate},
          t.contract_qualification       = ?,
          t.contract_level               = ?,
          t.duty                         = ?,
          t.is_apprentice                = ?,
          t.is_professional              = ?,
          t.is_it_organigramma_sicurezza = ?,
          t.it_ccnl                      = ?,
          t.address                      = ?,
          t.municipality                 = ?,
          t.province                     = ?,
          t.postal_code                  = ?,
          t.country                      = ?
      WHERE t.id = ?;
  `, [
    hr.name,
    hr.surname,
    hr.fiscalCode,
    hr.email,
    hr.phone,
    hr.birthPlace,
    hr.nationality,
    hr.contractQualification,
    hr.contractLevel,
    hr.duty,
    hr.isApprentice,
    hr.isProfessional,
    hr.isItOrganigrammaSicurezza,
    hr.itCcnl,
    hr.address,
    hr.municipality,
    hr.province,
    hr.postalCode,
    hr.country,
    id
  ]);
}

export async function logicDelete(id: Id) {
  const now = queryDate(new Date())
  return await query(`
      UPDATE hr t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}

export async function getAllDepartments(id: Id) {
  const rows = await query(`
      SELECT *
      FROM hr_departments hd
      WHERE hd.hr_id = ?
        AND hd.deleted_at IS NULL
  `, [id]);
  return emptyOrRows(rows)
}





