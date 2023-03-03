import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import path from "path";
import express, {json, urlencoded} from "express";
import dotenv from "dotenv";
import http from "http";
import {notFound, onError, onListening} from "./handlers/server/events";
import usersRouter from "./routes/users.routes";
import indexRouter from "./routes/index.routes";
import companiesRouter from "./routes/companies.routes";
import localUnitsRouter from "./routes/localUnits.routes";
import cors from "cors";
import {auth} from "./middlewares/auth.middleware";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/auth.routes";
import departmentsRouter from "./routes/departments.routes";
import hrRouter from "./routes/hr.routes";
import vehiclesRouter from "./routes/vehicles.routes";
import equipmentsRouter from "./routes/equipments.routes";
import documentsRouter from "./routes/documents.routes";
import propertiesRoutes from "./routes/properties.routes";

const app = express();
const server = http.createServer(app);
const router = express.Router();

dotenv.config();
const PORT = process.env.PORT || 8080;
app.set('port', PORT);

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
const swaggerSetup = swaggerUi.setup(undefined, {
  swaggerOptions: {
    url: "/swagger.json",
  },
  customSiteTitle: "Argos-IoT APIs",
  customCss: ".swagger-ui .topbar { display: none }",
  customfavIcon: "/icons/api.ico",
});

app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(limiter)
app.use(urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use("/api/v1", router);

router.use('/', indexRouter);
router.use('/auth', authRouter);
router.use('/users', auth, usersRouter);
router.use('/companies', auth, companiesRouter);
router.use('/local-units', auth, localUnitsRouter);
router.use('/departments', auth, departmentsRouter);
router.use('/hr', auth, hrRouter);
router.use('/vehicles', auth, vehiclesRouter);
router.use('/equipments', auth, equipmentsRouter);
router.use('/properties', auth, propertiesRoutes);
router.use('/documents', auth, documentsRouter);

router.use('/favicon.ico', express.static('public/icons/api.ico'));
router.use("/docs", swaggerUi.serve, swaggerSetup);
router.use(notFound);

server.on('error', onError);
server.on('listening', onListening);

app.listen(PORT, () => {
  console.info(`⚡[server]: Server is running at http://localhost:${PORT}/api/v1`);
});

module.exports = app;
