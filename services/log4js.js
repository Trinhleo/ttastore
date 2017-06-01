var log4js = require('log4js');
var mkdirp = require('mkdirp');
var config = require('./../config/config.json');

mkdirp.sync('./logs');

log4js.configure(config.LOG4JS_CONFIG);

module.exports = {
    debug: log4js.getLogger('debug'),
    info: log4js.getLogger('info'),
    error: log4js.getLogger('error'),
    transactionInfo: log4js.getLogger('transaction-info')
};