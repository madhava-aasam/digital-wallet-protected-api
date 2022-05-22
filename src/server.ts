import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
import userRoutes from './routes/user';
import mongoose from 'mongoose';

const router = express();

/** Connect to Mongo */
// mongoose
//     .connect(config.mongo.connectionString)
//     .then((result) => {
//         console.info('************ mongodb connected ************');
//     })
//     .catch((error) => {
//         console.info('~~~~~~~~~~~~~~~ mongoodb connection errorr ~~~~~~~~~~~~~~~', error);
//     });

/** Log the req & resp */
router.use((req, res, next) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/api', userRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => console.info(`************ server is running at ${config.server.hostname}:${config.server.port} ************`));
