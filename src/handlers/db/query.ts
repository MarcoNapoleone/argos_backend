import mysql from "mysql2/promise"
import {database} from "../../config/database"


export async function query(sql: string, params?: any | any[] | { [param: string]: any }) {
  const connection = await mysql.createConnection(database.credential);
  const [rows, fields] = await connection.execute(sql, params);
  return rows as mysql.OkPacket
}

