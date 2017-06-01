'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        first_name: DataTypes.STRING(45),
        last_name: DataTypes.STRING(45),
        password: DataTypes.STRING(75),
        salt: DataTypes.STRING(40),
        gender: DataTypes.STRING(45),
        phone_number: DataTypes.STRING(20),
        avatar: DataTypes.STRING(100),
        address: DataTypes.STRING(100),
        status: DataTypes.STRING(50),
        activation_code: DataTypes.STRING(100),
        reset_code: DataTypes.STRING(100),
        expired_date: DataTypes.DATE,
        created_date: DataTypes.DATE,
        created_by: DataTypes.STRING(100),
        modified_date: DataTypes.DATE,
        modified_by: DataTypes.STRING(100),
    }, {
            tableName: 'USERS',
            timestamps: false,
            underscored: true,

            classMethods: {
                // associate: function associate(models) {
                //     User.hasMany(models.UserRole, {
                //         as: 'role',
                //         foreignKey: 'user_id'
                //     });
                //     User.hasMany(models.UserMeta, {
                //         as: 'user_metas',
                //         foreignKey: 'user_id'
                //     });
                //     User.hasMany(models.Review, {
                //         as: 'feedback',
                //         foreignKey: 'driver_id'
                //     });
                //     User.hasMany(models.UserToVehicle, {
                //         as: 'vehicles',
                //         foreignKey: 'user_id'
                //     });
                //     User.hasOne(models.UserLocation, {
                //         as: 'location',
                //         foreignKey: 'user_id'
                //     });
                //     User.hasOne(models.FileToEntity, {
                //         as: 'avatar',
                //         foreignKey: 'entity_id',
                //         scope: {
                //             entity_name: 'avatar'
                //         }
                //     });
                // },
            },
        });

    return User;
};