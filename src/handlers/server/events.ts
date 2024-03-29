import createError from "http-errors";
import {formattedResponse} from "../http/formattedResponse";

export function onError(error: any, port: string) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function onListening(server: any) {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}

export function notFound(req: any, res: any, next: any) {
  res.status(404).json(
    formattedResponse({
        status: 404,
        object: "route",
        message: "Route not found",
      }
    ));
  next(createError(404));
}