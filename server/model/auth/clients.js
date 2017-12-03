'use strict';

const Sequelize = require('sequelize');

module.exports = (db) => {
    const OAuthClient = db.define('OAuthClient',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            'client_id': {
                type: Sequelize.STRING(80),
                allowNull: false,
                unique: true
            },
            'client_secret': {
                type: Sequelize.STRING(80),
                allowNull: false,
                unique: true
            },
            'redirect_uri': {
                type: Sequelize.STRING(2000)
            },
            'grant_types': {
                type: Sequelize.STRING(80)
            },
            scope: {
                type: Sequelize.STRING
            }
        },
        {
            tableName: 'oauth_clients',
            timestamps: false,
            underscored: true,
            classMethods: {
                associate: (models) => {
                    OAuthClient.belongsTo(models.Account, {
                        foreignKey: 'account_id'
                    });
                }
            }
        }
    );

    return OAuthClient;
};
