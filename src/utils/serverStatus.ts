import mysql from "mysql2";
import {config} from "../config/config";

export async function serverStatus() {
    const db = await mysql.createConnection(config.db);
    await db.execute('SELECT 1=1', (err)=>{
        if (err) return "service not available";
    })
    return "ok"
}