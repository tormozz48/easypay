'use strict';

const Sequelize = require('sequelize');

module.exports = (db) => {
    const OAuthAccessToken = db.define('OAuthAccessToken',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            'access_token': {
                type: Sequelize.STRING(256),
                allowNull: false,
                unique: true
            },
            expires: {
                type: Sequelize.DATE,
                allowNull: false
            },
            scope: {
                type: Sequelize.STRING
            }
        },
        {
            tableName: 'oauth_access_tokens',
            timestamps: false,
            underscored: true,
            classMethods: {
                associate: (models) => {
                    OAuthAccessToken.belongsTo(models.OAuthClient, {
                        foreignKey: 'client_id'
                    });

                    OAuthAccessToken.belongsTo(models.Account, {
                        foreignKey: 'account_id'
                    });
                }
            }
        }
    );

    return OAuthAccessToken;
};
