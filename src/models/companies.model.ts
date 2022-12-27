import {query} from '../utils/query';
import {emptyOrRow, emptyOrRows} from "../utils/emptyOrRows";
import {Id} from "../entities/Id";
import {UUID} from "../utils/uuid";

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

export async function getAll(userId: Id) {

  const rows = await query(`
      SELECT *
      FROM companies
      WHERE id IN (SELECT ucr.company_id
                   FROM user_companies ucr
                            INNER JOIN companies c ON ucr.company_id = c.id
                   WHERE ucr.user_id = ?)
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
                    AND ucr.company_id = ?)
  `, [userId, id]);
  return emptyOrRow(row)
}

export async function create(company: Company) {
  return await query(`
    `)
}

export async function update(id: Id, company: Company) {

  return await query(``);
}

export async function logicDelete(id: Id) {

  const now = Date();
  return await query(`
      UPDATE companies t
      SET t.deleted_at = ${now}
      WHERE t.id = ?;
  `, [id]);
}

export async function getLocalUnits(userId: Id, id: Id) {
  const rows = await query(`
      SELECT lu.*
      FROM local_units lu
               INNER JOIN user_companies ucr ON ucr.company_id = lu.company_id
      WHERE ucr.user_id = ?
        AND ucr.company_id = ?
  `, [userId, id]);
  return emptyOrRows(rows)
}
