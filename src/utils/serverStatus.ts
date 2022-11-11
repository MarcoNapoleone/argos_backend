import mysql from "mysql2";
import {database} from "../config/database";

export async function serverStatus() {
    const db = await mysql.createConnection(database.credential);
    await db.execute('SELECT 1=1', (err)=>{
        if (err) return "service not available";
    })
    return "ok"
}