import cookieParser from "cookie-parser";
import logger from "morgan";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import path from "path";
import express, {json, urlencoded} from "express";
import dotenv from "dotenv";
import http from "http";
import {notFound, onError, onListening} from "./utils/eventHandler";
import bodyParser from "body-parser";
import usersRouter from "./routes/users.routes";
import indexRouter from "./routes/index.routes";
import companiesRouter from "./routes/companies.routes";
import localUnitsRouter from "./routes/localUnits.routes";

const app = express();
const server = http.createServer(app);

dotenv.config();
const PORT = process.env.PORT || 8080;

app.set('port', PORT);

app.use(logger('dev'));
app.use(json());
app.use(bodyParser.json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/companies', companiesRouter);
app.use('/localUnits', localUnitsRouter);
app.use("/docs", swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    }));
app.use(notFound());

server.on('error', onError);
server.on('listening', onListening);

app.listen(PORT, () => {
    console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = app;
