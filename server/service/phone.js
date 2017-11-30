'use strict';

const router = require('express').Router();
const debug = require('debug')('server:service:phone');

module.exports = (model) => {
    debug('create phone service');

    const Phone = model.Phone;
    const onError = (res) => (error) => res.status(500).json({error: error.message});

    // get list of all phone numbers
    router.get('/all', function(req, res) {
        debug('get all phones from database');

        return Phone.findAll({raw: true})
            .then((phones) => res.status(200).json({data: phones}))
            .catch(onError(res));
    });

    // add new phone number
    router.put('/', function(req, res) {
        const number = req.body.number;

        debug(`add new phone with number ${number} to database`);

        return Phone.create({number})
            .then(() => res.status(201).json({message: 'phone created'}))
            .catch(onError(res));
    });

    // remove existed phone number
    router.delete('/:id', function(req, res) {
        const id = req.params.id;

        debug(`remove phone with id ${id} from database`);

        return Phone.findById(id)
            .then((phone) => phone ? phone.destroy() : Promise.resolve())
            .then(() => res.status(200).json({message: 'phone removed'}))
            .catch(onError(res));
    });

    return router;
};
