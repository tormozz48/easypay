'use strict';

const Sequelize = require('sequelize');

module.exports = (db) => {
    const OAuthScope = db.define('OAuthScope',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            scope: {
                type: Sequelize.STRING
            },
            'is_default': {
                type: Sequelize.BOOLEAN
            }
        },
        {
            tableName: 'oauth_scopes',
            timestamps: false,
            underscored: true
        }
    );

    return OAuthScope;
};
