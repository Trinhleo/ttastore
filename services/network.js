var networkInterfaces = require('os').networkInterfaces();
var config = require('./../config/config.json');

module.exports = {
    getHostName: getHostName
};

function getHostName() {
    return hostName = config.HOST_NAME;
}