import {OkPacket} from "mysql2";
import mysql from "mysql2/promise"
import {config} from "../config/config"


export async function query(sql: string, params?: any | any[] | { [param: string]: any }){
    const connection = await mysql.createConnection(config.db);
    const [rows, fields] = await connection.execute(sql, params);
    return rows as OkPacket;
}