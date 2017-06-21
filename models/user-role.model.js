'use strict';

module.exports = function (sequelize, DataTypes) {
    var UserRole = sequelize.define('UserRole', {
        user_id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            unsigned: true
        },
        role_id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            unsigned: true
        },
        created: DataTypes.DATE
    }, {
            tableName: 'USER_ROLES',
            timestamps: false,
            underscored: true,
            classMethods: {
            },
        });

    return UserRole;
};
