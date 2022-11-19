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
import cors from "cors";
import {auth} from "./middleware/auth.middleware";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/auth.routes";

const app = express();
const server = http.createServer(app);
const router = express.Router();

dotenv.config();
const PORT = process.env.PORT || 8080;

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
})
const swaggerSetup = swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-flattop.css',
});

app.set('port', PORT);

app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(morgan('tiny'));
app.use(limiter)
app.use(urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use("/api/v1", router);
router.use('/', indexRouter);
router.use('/auth', authRouter);
router.use('/users', auth, usersRouter);
router.use('/companies', auth, companiesRouter);
router.use('/companies/:companyId/local-units', auth, localUnitsRouter);
router.use('/favicon.ico', express.static('public/icons/api.ico'));
router.use("/docs", swaggerUi.serve, swaggerSetup);
router.use(notFound);

server.on('error', onError);
server.on('listening', onListening);

app.listen(PORT, () => {
    console.log(`⚡[server]: Server is running at http://localhost:${PORT}/api/v1`);
});

module.exports = app;
