var serverConfig = require('./../config/server');
module.exports = function (app) {
    // User Routes
    app.use(serverConfig.BASE_URL + '/auth', require('./auth.routes.js')());
    // app.use('/api/user', require('./user.routes.js')());

};