'use strict';

const Sequelize = require('sequelize');

module.exports = (db) => {
    return db.define('Account',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        },
        {}
    );
};
