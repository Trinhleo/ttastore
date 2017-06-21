var config = require('./db');
var Sequelize = require('sequelize');

config.sql.dialectOptions = {
    multipleStatements: true
};
var db = {
    sequelize: new Sequelize(
        config.sql.database,
        config.sql.username,
        config.sql.password,
        config.sql
    )
};

db.User = db.sequelize.import('./../models/user.model');
db.UserRole = db.sequelize.import('./../models/user-role.model')

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;