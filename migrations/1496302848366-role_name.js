var pool = require('../config/sequelize').sequelize;

module.exports = {
  up: function (next) {
    var sql = "" +
      "CREATE TABLE IF NOT EXISTS `ROLE_NAMES` (" +
      "`role_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
      "`name` varchar(15) DEFAULT NULL," +
      "`enabled` tinyint(1) DEFAULT '1'," +
      "`created` datetime DEFAULT CURRENT_TIMESTAMP," +
      "PRIMARY KEY (`role_name_id`)," +
      "UNIQUE KEY `role_name_UNIQUE` (`name`)" +
      ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;"

    pool.query(sql).spread(function () {
      var sql1 = "" +
        "INSERT INTO `ROLE_NAMES` (`name`, `enabled`, `created`) VALUES" +
        "('Admin', 1, NULL)," +
        "('Customer', 1, NULL);" 
      pool.query(sql1).spread(function () {
        next();
      });
    });
  },
  down: function (next) {
    var sql =
      " DROP TABLE IF EXISTS `ROLE_NAMES`";

    pool.query(sql).spread(function () {
      next();
    });
  }
};