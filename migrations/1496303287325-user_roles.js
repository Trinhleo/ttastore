var pool = require('../config/sequelize').sequelize;

module.exports = {
  up: function (next) {
    var sql = "" +
      "CREATE TABLE IF NOT EXISTS `USER_ROLES` (" +
      "`user_id` int(10) unsigned NOT NULL," +
      "`role_id` int(10) unsigned NOT NULL," +
      "`created` datetime DEFAULT CURRENT_TIMESTAMP," +
      "UNIQUE KEY `unique_combination` (`user_id`,`role_id`)," +
      "KEY `fk_USER_ROLES_ROLES1_idx` (`role_id`)" +
      ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;"

    pool.query(sql).spread(function () {
      next();
    });
  },
  down: function (next) {
    var sql =
      " DROP TABLE IF EXISTS `USER_ROLES`";

    pool.query(sql).spread(function () {
      next();
    });
  }
};