'use strict';

const router = require('express').Router();
const debug = require('debug')('server:service:phone');

module.exports = (model) => {
    debug('create phone service');

    const Account = model.Account;
    const onError = (res) => (error) => res.status(500).json({error: error.message});

    router.post('/login', function(req, res) {
        onError(res)({message: 'stub error'});
    });

    router.post('/logout', function(req, res) {
        onError(res)({message: 'stub error'});
    });

    return router;
};
