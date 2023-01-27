import {Id} from "../types/Id";
import {query} from "../handlers/db/query";
import {Event} from "../types/Event";

type Response = 'SUCCESS' | 'ERROR';

export class Log {
  id?: Id;
  userId?: Id;
  event?: Event;
  response?: Response;
  message?: string;
}

export const create = (log: Log) => {
  query(`
      INSERT INTO logs(user_id,
                       event,
                       response,
                       message)
      VALUES (?, ?, ?, ?)
  `, [
    log?.userId,
    log?.event,
    log?.response,
    log?.message
  ]).then(() => {
    return
  })
}