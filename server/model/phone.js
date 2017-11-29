'use strict';

const Sequelize = require('sequelize');

/* eslint-disable no-useless-escape */
const PHONE_NUMBER_FORMAT = /^\+\d(\-\d{3}){2}(\-\d{2}){2}$/;
/* eslint-enable no-useless-escape */

module.exports = (db) => {
    return db.define('Phone',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            validate: {
                phoneFormat() {
                    if (!PHONE_NUMBER_FORMAT.test(this.number)) {
                        throw new Error('Invalid phone number format');
                    }
                }
            }
        }
    );
};
