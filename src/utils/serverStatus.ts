import {query} from "./query";

export async function serverStatus() {
  try {
    const result = await query('SELECT 1=1')
    if (!result) new Error()
    return true
  } catch (err) {
    return false
  }

}