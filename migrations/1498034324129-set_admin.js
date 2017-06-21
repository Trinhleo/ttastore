var pool = require('../config/sequelize').sequelize;

module.exports = {
  up: function (next) {

    var sql1 = "" +
      "INSERT INTO `USERS` (`first_name`, `last_name`, `email`, `password`, `salt`,`created_by`,`username`) VALUES " +
      "('admin','admin','admin@ttastore.com','$2a$10$CValvg7/x39NJEXySqhPXeZW7sDvsl.wdmFxx4PwJuHhzBNUTnr.K','$2a$10$CValvg7/x39NJEXySqhPXe','admin@ttastore.com','admin');"
    pool.query(sql1).spread(function () {
      var sql = "SELECT * FROM `USERS` WHERE `email`='admin@ttastore.com'";
      pool.query(sql).spread(function (_admin) {
        var admin = _admin[0];
        var sql2 = "" +
          "INSERT INTO `USER_ROLES` (`user_id`, `role_id`) VALUES " +
          "(" + admin.user_id + ",1);";
        pool.query(sql2).spread(function () {
          next();
        });
      });
    });
  },
  down: function (next) {
    var sql = "SELECT * FROM `USERS` WHERE `email`='admin@ttastore.com'";
    var sql1 = "DELETE FROM `USERS` WHERE `email`='admin@ttastore.com';";
    pool.query(sql).spread(function (_admin) {
       var admin = _admin[0];
      var sql2 = "DELETE FROM `USER_ROLES` WHERE `user_id`=" + admin.user_id + ";";
      pool.query(sql2).spread(function (admin) {
        pool.query(sql1).spread(function () {
          next();
        }).catch(function (err) {
          next();
        });
      }).catch(function (err) {
        next();
      });
    });
  }
};