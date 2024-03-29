import {query} from '../handlers/db/query';
import {emptyOrRow, emptyOrRows} from "../handlers/db/emptyOrRows";
import {Id} from "../types/Id";
import {Role} from "../types/Role";
import {UUID} from "../types/UUID";
import {queryDate} from "../handlers/dateTime/queryDate";

type Status = 'ACTIVE' | 'INACTIVE' | 'DISABLED';

export class User {

  id?: Id;

  uuid?: UUID;

  name?: string;

  surname?: string;

  email?: string;

  password?: string;

  status?: Status;

  role?: Role;

  createdAt?: Date;

  deletedAt?: Date;

  version?: number;

  updatedAt?: Date;

}

export async function getAll() {
  const rows = await query(`
      SELECT *
      FROM users
  `);
  return emptyOrRows(rows)
}

export async function getById(id: Id) {

  const row = await query(`
      SELECT *
      FROM users
      WHERE id = ?
  `, [id]);
  return emptyOrRow(row)
}

export async function getByUUID(uuid: UUID) {

  const row = await query(`
      SELECT *
      FROM users
      WHERE uuid = ?
  `, [uuid]);
  return emptyOrRow(row)
}

export async function findOne(column: string, value: string | number) {

  const row = await query(`
      SELECT *
      FROM users
      WHERE ${column} = ?
  `, [value]);
  return emptyOrRow(row)
}

export async function create(user: User) {
  return await query(`
      INSERT INTO users(uuid,
                        name,
                        surname,
                        email,
                        password)
      VALUES (?, ?, ?, ?, ?)
  `, [
    user?.uuid,
    user?.name,
    user?.surname,
    user?.email,
    user?.password,
  ])
}

export async function update(id: Id, user: User) {
  return await query(`
      UPDATE users t
      SET t.name     = ?,
          t.surname  = ?,
          t.email    = ?,
          t.role     = ?,
          t.password = ?
      WHERE t.id = ?;
  `, [
    user.name,
    user.surname,
    user.email,
    user.role,
    user.password,
    id
  ]);
}

export async function logicDelete(id: Id) {
    const now = queryDate(new Date());
  return await query(`
      UPDATE users t
      SET t.deleted_at = ?
      WHERE t.id = ?;
  `, [now, id]);
}


