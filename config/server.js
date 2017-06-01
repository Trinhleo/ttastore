var config = require('./config.json');

module.exports = {
    BASE_URL    : "/api/v1",
    PORT        : process.env.PORT || config.SERVER.PORT
};