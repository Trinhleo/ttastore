var pool = require('../config/sequelize').sequelize;

module.exports = {
  up: function (next) {
    var sql = "" +
      "CREATE TABLE IF NOT EXISTS `USERS` (" +
      "`user_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
      "`email` varchar(45) NOT NULL," +
      "`username` varchar(45) NOT NULL," +
      "`first_name` varchar(45) DEFAULT NULL," +
      "`last_name` varchar(45) DEFAULT NULL," +
      "`display_name` varchar(100) DEFAULT NULL," +
      "`password` varchar(75) DEFAULT NULL," +
      "`salt` varchar(40) DEFAULT NULL," +
      "`gender` varchar(45) DEFAULT NULL," +
      "`phone_number` varchar(20) DEFAULT NULL," +
      "`avatar` varchar(100) DEFAULT NULL," +
      "`address` varchar(100) DEFAULT NULL," +
      "`status` varchar(50) DEFAULT NULL," +
      "`activation_code` varchar(100) DEFAULT NULL," +
      "`reset_code` varchar(100) DEFAULT NULL," +
      "`expired_date` datetime DEFAULT NULL," +
      "`created_by` varchar(100) DEFAULT NULL," +
      "`created_date` datetime DEFAULT CURRENT_TIMESTAMP," +
      "`modified_by` varchar(100) DEFAULT NULL," +
      "`modified_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP," +
      "PRIMARY KEY (`user_id`)," +
      "UNIQUE KEY `email_UNIQUE` (`email`)," +
      "UNIQUE KEY `username_UNIQUE` (`username`)," +
      "KEY `email_INDEX` (`email`)," +
      "KEY `username_INDEX` (`username`)" +
      ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

    pool.query(sql).spread(function () {
      next();
    });
  },
  down: function (next) {
    var sql =
      " DROP TABLE IF EXISTS `USERS`";

    pool.query(sql).spread(function () {
      next();
    });
  }
};