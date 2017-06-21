var networkInterfaces = require('os').networkInterfaces();
var config = require('./../config/config.json');

module.exports = {
    getHostName: getHostName
};

function getHostName() {
    return hostName = process.env.HOST || config.HOST_NAME;
}