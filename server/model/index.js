'use strict';

const _ = require('lodash');
const config = require('config');
const Client = require('pg').Client;
const Sequelize = require('sequelize');
const debug = require('debug')('server:model:index');

const createAccountModel = require('./account');
const createPhoneModel = require('./phone');

module.exports = async function() {
    const dbConfig = config.get('db');
    const {host, port, user, password, database} = dbConfig;

    await createDatabase(dbConfig);

    debug('connect to database');
    debug(`database host: ${host}`);
    debug(`database port: ${port}`);
    debug(`database user: ${user}`);
    debug(`database password: ${password}`);
    debug(`database name ${database}`);

    const db = new Sequelize(database, user, password, {
        dialect: 'postgres',
        host,
        port,
        logging: _.noop
    });

    await testConnection(db);

    debug('initialize application models');
    const Account = createAccountModel(db);
    const Phone = createPhoneModel(db);

    debug('create database tables');
    await Promise.all([Account.sync(), Phone.sync()]);

    await populateDatabase({Phone});

    return {db, Account, Phone};
};

async function createDatabase({host, port, user, password, database}) {
    const client = new Client({host, port, user, password, database: 'postgres'});
    await client.connect();

    debug(`create database "${database}" if it does not exists yet`);
    try {
        await client.query(`CREATE DATABASE ${database}`);
        console.info(`Database ${database} has been successfully created`);
    } catch (error) {
        console.warn(error.message);
    } finally {
        await client.end();
    }
}

async function testConnection(db) {
    try {
        await db.authenticate();
        console.info('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}

async function populateDatabase({Phone}) {
    const stub = config.get('stub');

    await Promise.all(stub.phones.map((number) => {
        return Phone.create({number}).catch(_.noop);
    }));
    // TODO добавить генерацию для данных аккаунта
}
