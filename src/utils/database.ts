import {OkPacket, QueryOptions} from "mysql2";
import mysql from "mysql2/promise"
import {config} from "../config/config"


export async function database(sql: string, params?: QueryOptions){
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);
    return results as OkPacket;
}