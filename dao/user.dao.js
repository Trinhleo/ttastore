var sqldb = require('../config/sequelize');
var User = sqldb.User;
var Sequelize = require('sequelize');
var errorConst = require('../config/error.constant');
var constant = require('../config/constant');
var _ = require('lodash');

module.exports = {
    listAll: listAll,
    findById: findById,
    findOne: findOne,
    create: create,
    update: update
};

function getPublicUser(user) {
    delete user.password;
    delete user.salt;
    return user;
}

async function listAll(condition) {
    var where = condition;
    try {
        var users = await User.findAll({ where: where });
        _.forEach(users, function (user) {
            user = getPublicUser(user);
        })
        return users;
    } catch (err) {
        throw err;
    }
}
async function findById(id) {
    try {
        var user = await User.findById(id);
        return user;
    } catch (err) {
        throw err;
    }
}
async function findOne(condition) {
    var where = condition;
    try {
        var user = await User.findOne({ where: where });
        return user;
    } catch (err) {
        throw err;
    }
}
async function create(model) {
    try {
        var user = await User.create(model);
        return user;
    } catch (err) {
        throw err;
    }
}
async function update(model) {
    try {
        var user = await User.Update(model);
        return user;
    } catch (err) {
        throw err;
    }
}
