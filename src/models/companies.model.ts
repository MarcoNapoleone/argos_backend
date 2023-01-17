import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

export class Company {
  id?: Id;
  uuid?: UUID;
  name?: string;
  address?: string;
  email?: string;
  province?: string;
  postalCode?: string;
  fiscalCode?: string;
  vatCode?: string;
  registeredMunicipality?: string;
  phone?: string;
  createdAt?: Date;
  deletedAt?: Date;
  version?: number;
  updatedAt?: Date;
}

export const defaultCompany: Company = {
  name: null,
  address: null,
  email: null,
  province: null,
  postalCode: null,
  fiscalCode: null,
  vatCode: null,
  registeredMunicipality: null,
  phone: null
}

export async function getAll(userId: Id) {

  const rows = await query(`
      SELECT *
      FROM companies
      WHERE id IN (SELECT ucr.company_id
                   FROM user_companies ucr
                            INNER JOIN companies c ON ucr.company_id = c.id
                   WHERE ucr.user_id = ?
                     AND c.deleted_at IS NULL)
  `, [userId]);
  return emptyOrRows(rows)
}

export async function getById(userId: Id, id: Id) {

  const row = await query(`
      SELECT *
      FROM companies
      WHERE id = (SELECT ucr.company_id
                  FROM user_companies ucr
                           INNER JOIN companies c
                                      ON ucr.company_id = c.id
                  WHERE ucr.user_id = ?
                    AND ucr.company_id = ?
                    AND c.deleted_at IS NULL)
  `, [userId, id]);
  return emptyOrRow(row)
}

export async function create(company: Company) {
  return await query(`
      INSERT INTO companies(uuid,
                            name,
                            address,
                            email,
                            province,
                            postal_code,
                            fiscal_code,
                            vat_code,
                            registered_municipality,
                            phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    company.uuid,
    company.name,
    company.address,
    company.email,
    company.province,
    company.postalCode,
    company.fiscalCode,
    company.vatCode,
    company.registeredMunicipality,
    company.phone
  ])
}

export async function update(id: Id, company: Company) {
  return await query(`
      UPDATE companies
      SET name                    = ?,
          address                 = ?,
          email                   = ?,
          province                = ?,
          postal_code             = ?,
          fiscal_code             = ?,
          vat_code                = ?,
          registered_municipality = ?,
          phone                   = ?
      WHERE id = ?
  `, [
    company.name,
    company.address,
    company.email,
    company.province,
    company.postalCode,
    company.fiscalCode,
    company.vatCode,
    company.registeredMunicipality,
    company.phone,
    id
  ])
}

export async function logicDelete(id: Id) {

  const now = queryDate(new Date());
  return await query(`
      UPDATE companies t
      SET t.deleted_at = "${now}"
      WHERE t.id = ?;
  `, [id]);
}

export async function getAllLocalUnits(userId: Id, id: Id) {
  const rows = await query(`
      SELECT lu.*
      FROM user_companies uc
               INNER JOIN
           local_units lu
           ON
               uc.company_id = lu.company_id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND lu.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

export async function getAllDepartments(userId: Id, id: Id) {
  const rows = await query(`
      SELECT d.*
      FROM user_companies uc
               INNER JOIN
           local_units lu
           ON
               uc.company_id = lu.company_id
               INNER JOIN
           departments d
           ON
               lu.id = d.local_unit_id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND d.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

export async function getAllVehicles(userId: Id, id: Id) {
  const rows = await query(`
      SELECT v.*
      FROM user_companies uc
               INNER JOIN
           local_units lu
           ON
               uc.company_id = lu.company_id
               INNER JOIN
           vehicles v
           ON
               lu.id = v.local_unit_id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND v.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

export async function getAllHR(userId: Id, id: Id) {
  const rows = await query(`
      SELECT hr.*
      FROM user_companies uc
               INNER JOIN
           local_units lu
           ON
               uc.company_id = lu.company_id
               INNER JOIN
           departments d
           ON
               lu.id = d.local_unit_id
               INNER JOIN
           hr_departments hrd
           ON
               d.id = hrd.department_id
               INNER JOIN
           hr
           ON
               hrd.hr_id = hr.id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND hr.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

export async function getAllEquipments(userId: Id, id: Id) {
  const rows = await query(`
      SELECT e.*
      FROM user_companies uc
               INNER JOIN
           local_units lu
           ON
               uc.company_id = lu.company_id
               INNER JOIN
           departments d
           ON
               lu.id = d.local_unit_id
               INNER JOIN
           equipments e
           ON
               e.department_id = d.id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND e.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

export async function getAllProperties(userId: Id, id: Id) {
  const rows = await query(`
      SELECT p.*
      FROM user_companies uc
               INNER JOIN
           properties p
           ON
               uc.company_id = p.company_id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND p.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

export async function getAllDocuments(userId: Id, id: Id) {
  const rows = await query(`
      SELECT d.*
      FROM user_companies uc
               INNER JOIN
           documents d
           ON
               uc.company_id = d.company_id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND d.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

export async function getAllTimetables(userId: Id, id: Id) {
  const rows = await query(`
      SELECT t.*
      FROM user_companies uc
               INNER JOIN
           timetables t
           ON
               uc.company_id = t.company_id
      WHERE uc.user_id = ?
        AND uc.company_id = ?
        AND t.deleted_at IS NULL
  `, [userId, id]);
  return emptyOrRows(rows)
}

// todo: permissions handling
export async function getAllModules(userId: Id, id: Id) {
  const rows = await query(`
      SELECT *
      FROM modules
  `, [userId, id]);
  return emptyOrRows(rows)
}
