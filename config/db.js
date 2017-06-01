var mysql = require('mysql');
var config = require('./config.json');

module.exports = {
  sql: config.DB,
  db: 'sql'
};