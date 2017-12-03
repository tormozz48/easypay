'use strict';

const Sequelize = require('sequelize');

module.exports = (db) => {
    const OAuthAuthorizationCode = db.define('OAuthAuthorizationCode',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            'authorization_code': {
                type: Sequelize.STRING(256),
                allowNull: false,
                unique: true
            },
            expires: {
                type: Sequelize.DATE,
                allowNull: false
            },
            'redirect_uri': {
                type: Sequelize.STRING(2000)
            },
            scope: {
                type: Sequelize.STRING
            }
        },
        {
            tableName: 'oauth_authorization_codes',
            timestamps: false,
            underscored: true,
            classMethods: {
                associate: (models) => {
                    OAuthAuthorizationCode.belongsTo(models.OAuthClient, {
                        foreignKey: 'client_id'
                    });

                    OAuthAuthorizationCode.belongsTo(models.Account, {
                        foreignKey: 'account_id'
                    });
                }
            }
        }
    );

    return OAuthAuthorizationCode;
};
