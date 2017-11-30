'use strict';

const path = require('path');
const config = require('config');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const express = require('express');

const createModel = require('./model/index');
const createPhoneService = require('./service/phone');
const createAccountService = require('./service/account');

const debug = require('debug')('server:index');

const publicFolder = path.resolve(__dirname, '../web');
const port = config.get('application.port');

function initServer(model) {
    debug('start express server');

    const app = express();
    app.use(morgan('common'));
    app.use(serveStatic(publicFolder, {fallthrough: true}));
    app.use(bodyParser.json());
    app.use('/api/account', createAccountService(model));
    app.use('/api/phone', createPhoneService(model));
    app.listen(port, () => {
        console.info(`running on http://localhost:${port}`);
    });
    return app;
}

createModel()
    .then(initServer)
    .catch((error) => {
        console.log(error);
        console.error('Error occur while initializing application. Process will be exit');
        process.exit(1);
    });
