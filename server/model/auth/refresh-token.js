'use strict';

const Sequelize = require('sequelize');

module.exports = (db) => {
    const OAuthRefreshToken = db.define('OAuthRefreshToken',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            'refresh_token': {
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
            tableName: 'oauth_refresh_tokens',
            timestamps: false,
            underscored: true,
            classMethods: {
                associate: (models) => {
                    OAuthRefreshToken.belongsTo(models.OAuthClient, {
                        foreignKey: 'client_id'
                    });

                    OAuthRefreshToken.belongsTo(models.Account, {
                        foreignKey: 'account_id'
                    });
                }
            }
        }
    );

    return OAuthRefreshToken;
};
