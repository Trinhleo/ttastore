var pool = require('../config/sequelize').sequelize;

var fs = require('fs');

module.exports = {
  up: function (next) {
    var sql = "" +
      "ALTER TABLE `USER_ROLES`" +
      "ADD CONSTRAINT `fk_USER_ROLES_ROLES1` FOREIGN KEY (`role_id`) REFERENCES `ROLE_NAMES` (`role_name_id`) ON DELETE NO ACTION ON UPDATE NO ACTION," +
      "ADD CONSTRAINT `fk_USER_ROLES_USERS1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;"
    pool.query(sql).spread(function () {
      next();
    });
  },
  down: function (next) {
    var sql = "" +
      "ALTER TABLE `USER_ROLES`" +
      "DROP FOREIGN KEY `fk_USER_ROLES_ROLES1`," +
      "DROP FOREIGN KEY `fk_USER_ROLES_USERS1`;"
    pool.query(sql).spread(function () {
      next();
    }).catch(function (err) {
      next();
    });
  }
};