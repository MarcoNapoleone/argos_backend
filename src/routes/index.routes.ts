import express from "express";

const indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Argos-IoT',
        serverStatus: 'ok'
    });
});

export default indexRouter;
