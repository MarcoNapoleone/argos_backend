import {query} from "../db/query";

export async function serverStatus() {
  try {
    const result = await query('SELECT 1=1')
    if (!result) new Error('Server is not responding')

    return true
  } catch (err) {
    return false
  }

}