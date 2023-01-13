import {Id} from "../entities/Id";
import {query} from "../utils/query";
import {Event} from "../entities/Event";

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