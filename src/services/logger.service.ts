import * as LoggerModel from "../models/logger.model";
import {Log} from "../models/logger.model";

export function create(log: Log, details?: string) {
  if (log.response === "ERROR") {
    console.error(`Error@[user_id: ${log.userId}][${log.event}][${details}]`);
  }
  LoggerModel.create({
    userId: log.userId === undefined ? null : log.userId,
    event: log.event === undefined ? null : log.event,
    response: log.response === undefined ? null : log.response,
    message: log.message === undefined ? null : log.message
  })
}
